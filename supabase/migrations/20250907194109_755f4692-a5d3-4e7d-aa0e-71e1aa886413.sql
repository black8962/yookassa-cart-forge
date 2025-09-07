-- Drop the old category check constraint
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;

-- Add new category check constraint with frostmarket categories
ALTER TABLE public.products ADD CONSTRAINT products_category_check 
CHECK (category = ANY (ARRAY['читы'::text, 'курсовые'::text, 'VPN-сервис'::text]));

-- Insert sample products for frostmarket categories
INSERT INTO public.products (name, description, price, category, stock, image_url) VALUES
('Читы для CS:GO', 'Приватные читы для Counter-Strike: Global Offensive с защитой от VAC', 1500.00, 'читы', 100, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Читы для Valorant', 'Эксклюзивные читы для Valorant с функцией Aimbot и ESP', 2000.00, 'читы', 50, 'https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Универсальный WH', 'Wallhack для популярных FPS игр с возможностью кастомизации', 800.00, 'читы', 75, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('Курсовая по программированию', 'Готовая курсовая работа по основам программирования на Python', 3000.00, 'курсовые', 20, 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Диплом по информатике', 'Дипломная работа по разработке веб-приложения с исходным кодом', 8000.00, 'курсовые', 10, 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Реферат по базам данных', 'Подробный реферат по проектированию и администрированию БД', 1200.00, 'курсовые', 30, 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('NordVPN Premium', 'Премиум аккаунт NordVPN на 1 год с полным доступом', 2500.00, 'VPN-сервис', 40, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('ExpressVPN', 'Аккаунт ExpressVPN на 6 месяцев для анонимного серфинга', 1800.00, 'VPN-сервис', 25, 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Surfshark VPN', 'Безлимитный VPN Surfshark на 2 года для всех устройств', 3200.00, 'VPN-сервис', 35, 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');