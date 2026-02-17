INSERT INTO interests (key, label) VALUES
('fashion','Fashion'), ('youtubers','YouTubers'), ('deep_space','Deep Space'), ('deep_sea','Deep Sea'), ('ai_tools','AI Tools'), ('career','Career')
ON CONFLICT DO NOTHING;

INSERT INTO users (id, email, password_hash, role, created_at) VALUES
('11111111-1111-1111-1111-111111111111','admin@learneum.dev','$2a$10$Aa4Xz5J4GnyW8kl4m0X5j.v4M2gLMYF9k9U8oFWQ8uRUL1SxY2eTW','admin',NOW()),
('22222222-2222-2222-2222-222222222222','learner1@learneum.dev','$2a$10$MaB7MrWaL6B8AUf/2QgbiOgYvtzl4oNmQ4dkVyvk2AWBi56W5M8uO','learner',NOW())
ON CONFLICT DO NOTHING;

INSERT INTO profiles (user_id, display_name, level, streak, credits_balance, is_minor, privacy_opt_in, created_at) VALUES
('11111111-1111-1111-1111-111111111111','Admin',1,0,0,false,false,NOW()),
('22222222-2222-2222-2222-222222222222','Lina Learner',1,1,15,true,false,NOW())
ON CONFLICT DO NOTHING;

INSERT INTO reward_rules (id, event_type, credits, enabled, created_at) VALUES
(uuid_generate_v4(),'video_complete',5,true,NOW()),
(uuid_generate_v4(),'quiz_pass',10,true,NOW()),
(uuid_generate_v4(),'project_submit',20,true,NOW()),
(uuid_generate_v4(),'survey_complete',3,true,NOW()),
(uuid_generate_v4(),'share_content',2,true,NOW())
ON CONFLICT (event_type) DO NOTHING;

INSERT INTO level_rules (id, from_level, to_level, watch_required, quiz_required, foundations_required, projects_required, community_required, group_challenge_required, capstone_required, mentor_review_required, updated_at)
VALUES
(uuid_generate_v4(),1,2,50,5,0,0,false,false,false,false,NOW()),
(uuid_generate_v4(),2,3,0,0,4,1,false,false,false,false,NOW()),
(uuid_generate_v4(),3,4,0,0,0,0,true,true,false,false,NOW()),
(uuid_generate_v4(),4,5,0,0,0,0,false,false,true,true,NOW());

INSERT INTO content_items (id, title, description, video_url, topic, level_target, is_published, created_at) VALUES
(uuid_generate_v4(),'Intro to Prompting','Build better AI prompts in 5 minutes','https://www.youtube.com/watch?v=dQw4w9WgXcQ','ai_tools',1,true,NOW()),
(uuid_generate_v4(),'Career Discovery Sprint','Map your career options with simple frameworks','https://www.youtube.com/watch?v=3GwjfUFyY6M','career',1,true,NOW()),
(uuid_generate_v4(),'Creator Economy Basics','Learn monetization ethics and audience building','https://www.youtube.com/watch?v=oHg5SJYRHA0','youtubers',1,true,NOW());

INSERT INTO communities (id, name, description, created_at) VALUES
(uuid_generate_v4(),'AI Builders','Collaborative learning for AI tools and workflows',NOW()),
(uuid_generate_v4(),'Career Launchpad','Peer support for resumes, interviews, and portfolio work',NOW())
ON CONFLICT DO NOTHING;
