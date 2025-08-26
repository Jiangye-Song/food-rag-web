-- Insert sample food items from the JSON data
INSERT INTO food_items (text, region, type) VALUES
('Sushi is a traditional Japanese dish consisting of vinegared rice combined with various ingredients such as seafood, vegetables, and sometimes tropical fruits.', 'Asia', 'Main Course'),
('Pizza Margherita is a classic Italian pizza topped with tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.', 'Europe', 'Main Course'),
('Tacos are a traditional Mexican dish consisting of a small hand-sized corn or wheat tortilla topped with a filling.', 'North America', 'Main Course'),
('Pad Thai is a stir-fried rice noodle dish commonly served as street food and at most restaurants in Thailand.', 'Asia', 'Main Course'),
('Croissant is a buttery, flaky, viennoiserie pastry of Austrian origin, but mostly associated with France.', 'Europe', 'Dessert'),
('Hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.', 'North America', 'Main Course'),
('Ramen is a Japanese noodle soup dish consisting of Chinese-style wheat noodles served in a meat or fish-based broth.', 'Asia', 'Soup'),
('Paella is a rice dish originally from Valencia, Spain, that has become one of the most famous Spanish dishes worldwide.', 'Europe', 'Main Course'),
('Ceviche is a seafood dish popular in the coastal regions of Latin America and the Caribbean.', 'South America', 'Appetizer'),
('Baklava is a layered pastry dessert made of filo pastry, filled with chopped nuts, and sweetened with syrup or honey.', 'Middle East', 'Dessert')
ON CONFLICT DO NOTHING;
