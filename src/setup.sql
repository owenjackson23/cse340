-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');



-- ========================================
-- Service Project Table
-- ========================================
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

-- -- ========================================
-- -- Insert sample data: Projects
-- -- ========================================
INSERT INTO project (organization_id, title, description, location, date)
VALUES
(1, 'Community Park Renovation', 'Volunteers will help renovate a local park, including landscaping and playground equipment installation.', '123 Main St, Hometown', '2024-07-15'),
(1, 'Neighborhood Clean-Up', 'Join us for a community clean-up event to beautify our streets and public spaces.', '456 Elm St, Hometown', '2024-08-10'),
(1, 'Habitat for Humanity Build', 'Assist in building homes for families in need as part of our ongoing partnership with Habitat for Humanity.', '789 Oak St, Hometown', '2024-09-05'),
(1, 'Sustainable Garden Workshop', 'Learn about sustainable gardening practices and help create a community garden.', '321 Pine St, Hometown', '2024-10-12'),
(1, 'Youth Mentorship Program', 'Volunteer to mentor local youth through educational and recreational activities.', '654 Maple St, Hometown', '2024-11-20'),

(2, 'Urban Farm Tour & Workshop', 'Participate in a guided tour of our urban farm and learn about sustainable agriculture.', '987 Cedar St, Hometown', '2024-07-22'),
(2, 'Community Composting Initiative', 'Help set up a community composting program to reduce waste and promote sustainability.', '543 Birch St, Hometown', '2024-08-18'),
(2, 'Farm-to-School Program Launch', 'Assist in launching our farm-to-school program to provide fresh produce to local schools.', '210 Spruce St, Hometown', '2024-09-15'),
(2, 'Seasonal Harvest Festival', 'Join us for a festival celebrating the harvest season with local food and activities.', '876 Willow St, Hometown', '2024-10-25'),
(2, 'Volunteer Training Session', 'Attend a training session to become a certified volunteer for our urban farming projects.', '432 Aspen St, Hometown', '2024-11-30'),

(3, 'Charity Fundraising Gala', 'Help organize and run our annual fundraising gala to support local charities.', '135 Chestnut St, Hometown', '2024-07-29'),
(3, 'Holiday Toy Drive', 'Collect and distribute toys to children in need during the holiday season.', '246 Walnut St, Hometown', '2024-08-25'),
(3, 'Senior Center Volunteer Day', 'Spend a day volunteering at the local senior center, assisting with activities and events.', '357 Poplar St, Hometown', '2024-09-20'),
(3, 'Community Health Fair', 'Participate in organizing a health fair to provide free screenings and health education.', '468 Fir St, Hometown', '2024-10-30'),
(3, 'Neighborhood Safety Workshop', 'Help conduct workshops on neighborhood safety and emergency preparedness.', '579 Hemlock St, Hometown', '2024-11-15');

SELECT * FROM project;