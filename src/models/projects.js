import db from "./db.js";

const getAllProjects = async () => {
    const query = `
        SELECT project_id, title, project.description, location, date, name AS organization_name
        FROM public.project
            JOIN public.organization
                ON project.organization_id = organization.organization_id
        ;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            project_id,
            title,
            project.description,
            date,
            location,
            project.organization_id,
            name AS organization_name
        FROM public.project
            JOIN public.organization
                ON project.organization_id = organization.organization_id
        WHERE date >= CURRENT_DATE
        ORDER BY date
        LIMIT $1;
        `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            project_id,
            title,
            project.description,
            date,
            location,
            project.organization_id,
            name AS organization_name
        FROM public.project
            JOIN public.organization
                ON project.organization_id = organization.organization_id
        WHERE project_id = $1
        LIMIT 1;
        `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };