import db from "./db.js";

const getAllCategories = async () => {
    const query = `
        SELECT category_id, category_name
        FROM public.category
        ;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryDetails = async (id) => {
    const query = `
        SELECT
            category_id,
            category_name
        FROM category
        WHERE category_id = $1
        ;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const getProjectCategories = async (projectId) => {
    const query = `
        SELECT
            category.category_id,
            category_name
        FROM project_category
            JOIN category
                ON project_category.category_id = category.category_id
        WHERE project_id = $1
        ;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectsByCategory = async (categoryId) => {
    const query = `
        SELECT
            project.project_id,
            project.title,
            project.description,
            project.location,
            project.date,
            project.organization_id,
            organization.name AS organization_name
        FROM project_category
            JOIN project
                ON project_category.project_id = project.project_id
            JOIN organization
                ON project.organization_id = organization.organization_id
        WHERE project_category.category_id = $1
        ORDER BY project.date
        ;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

export { getAllCategories, getCategoryDetails, getProjectCategories, getProjectsByCategory, assignCategoryToProject, updateCategoryAssignments };