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

export { getAllCategories, getCategoryDetails, getProjectCategories, getProjectsByCategory };