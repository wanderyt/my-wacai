-- Create table
CREATE TABLE FIN (
  id VARCHAR(100) PRIMARY KEY,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  comment VARCHAR(200),
  date TEXT,
  money DECIMAL(10, 2)
);