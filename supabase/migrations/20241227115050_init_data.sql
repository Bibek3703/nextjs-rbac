insert into public.role_permissions (role, permission)
values
    ('admin', 'todos.update'),
    ('admin', 'todos.delete'),
    ('moderator', 'todos.delete');


DO $$
DECLARE
    user_id uuid;
BEGIN
    user_id := public.create_user('admin@example.com');

    insert into public.todos (title, description, status, visibility, created_by)
    values
        ('Set up project environment', 'Install all necessary development tools and dependencies', 'PROGRESS', 'public', user_id),
        ('Create database schema', 'Design and implement initial database structure', 'PROGRESS', 'public', user_id),
        ('Implement user authentication', 'Set up JWT-based authentication system', 'PROGRESS', 'private', user_id),
        ('Design API endpoints', 'Create REST API documentation and specifications', 'PROGRESS', 'public', user_id),
        ('Write unit tests', 'Develop comprehensive test suite for core functionality', 'PROGRESS', 'private', user_id),
        ('Setup CI/CD pipeline', 'Configure automated testing and deployment workflow', 'PROGRESS', 'public', user_id),
        ('Create user dashboard', 'Design and implement main user interface', 'PROGRESS', 'public', user_id),
        ('Implement search functionality', 'Add robust search features across the application', 'PROGRESS', 'private', user_id),
        ('Optimize database queries', 'Improve performance of key database operations', 'PROGRESS', 'public', user_id),
        ('Add error logging', 'Implement comprehensive error tracking system', 'PROGRESS', 'private', user_id),
        ('Create user documentation', 'Write detailed guides for end-users', 'PROGRESS', 'public', user_id),
        ('Implement file upload', 'Add secure file upload functionality', 'PROGRESS', 'private', user_id),
        ('Setup monitoring', 'Configure application monitoring and alerting', 'PROGRESS', 'public', user_id),
        ('Add email notifications', 'Implement automated email notification system', 'PROGRESS', 'private', user_id),
        ('Security audit', 'Conduct thorough security review of all features', 'PROGRESS', 'public', user_id),
        ('Mobile responsiveness', 'Ensure UI works well on all device sizes', 'PROGRESS', 'private', user_id),
        ('Implement caching', 'Add Redis caching for improved performance', 'PROGRESS', 'public', user_id),
        ('Create admin panel', 'Build administrative interface for system management', 'PROGRESS', 'private', user_id),
        ('API documentation', 'Generate comprehensive API documentation', 'PROGRESS', 'public', user_id),
        ('Performance optimization', 'Conduct overall system performance review and optimization', 'PROGRESS', 'private', user_id);
END $$;