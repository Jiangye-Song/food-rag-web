-- Create food_items table
CREATE TABLE IF NOT EXISTS food_items (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  region VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vector_operations table for tracking embedding operations
CREATE TABLE IF NOT EXISTS vector_operations (
  id SERIAL PRIMARY KEY,
  operation_type VARCHAR(50) NOT NULL, -- 'embed-new', 're-embed-all', 'flush'
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'failed'
  items_processed INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create query_logs table for analytics
CREATE TABLE IF NOT EXISTS query_logs (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255),
  query TEXT NOT NULL,
  response_time_ms INTEGER,
  success BOOLEAN DEFAULT true,
  model_used VARCHAR(100),
  sources_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_food_items_text ON food_items USING gin(to_tsvector('english', text));
CREATE INDEX IF NOT EXISTS idx_food_items_region ON food_items(region);
CREATE INDEX IF NOT EXISTS idx_food_items_type ON food_items(type);
CREATE INDEX IF NOT EXISTS idx_food_items_created_at ON food_items(created_at);

CREATE INDEX IF NOT EXISTS idx_vector_operations_created_at ON vector_operations(created_at);
CREATE INDEX IF NOT EXISTS idx_vector_operations_status ON vector_operations(status);

CREATE INDEX IF NOT EXISTS idx_query_logs_created_at ON query_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_query_logs_session_id ON query_logs(session_id);
