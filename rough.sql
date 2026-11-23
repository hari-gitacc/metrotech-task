create table categories(
  id integer PRIMARY KEY auto_increment,
  name varchar(100),
  description text null,
  created_at timestamp
);

drop table orders

create table products(
  id integer PRIMARY KEY auto_increment,
  name varchar(100),
  price decimal(10,2),
  stock integer,
  created_at timestamp,
  category_id integer,
  foreign key (category_id)
  references categories(id)
);


select c.name,c.email,c.phone, count(o.id) as no_of_orders
from customers c
inner join orders o 
on c.id = o.customer_id
GROUP by o.customer_id


  

select * from categories 

select * from customers where name like "%hari%"

select c.name from categories c
  join products p
  on c.id = p.category_id
  where c.id not in (select 1 from categories where category_id = p.id)
  
INSERT INTO orders (total_amount, status, customer_id,product_id,created_at)
VALUES
(1000000, 'PENDING',1,1, '2026-11-10 00:00:00')

  1,4,5,6,10,7,8


  select * from products p
  

  select * from orders
where created_at between '' and ''
  

  select * from orders  
  where created_at > "2026-11-16T10:40:21.600Z"

  INSERT INTO products (name, price, stock,category_id)
VALUES
('hair mask', 300,100,2)

  update orders
  set status = "PENDING"
  where id = 1

  select stock from products where id = (select product_id from orders where id = 1)

  select * from orders

  select * from products


ALTER Table orders 
MODIFY created_at timestamp 

select c.name,c.description, count(p.name) as no_of_products
from categories c
inner join products p 
on c.id = p.category_id
GROUP by p.category_id

select o.id, o.total_amount, o.status from orders o
join customers c on o.customer_id = c.id




create table customers(
  id integer PRIMARY KEY auto_increment,
  name varchar(100),
  email varchar(150),
  phone varchar(20),
  created_at timestamp
);

create table orders(
  id integer PRIMARY KEY auto_increment,
  total_amount decimal(10,2),
  status ENUM('PENDING','PAID','CANCELLED'),
  created_at timestamp,
  customer_id integer,
  foreign key (customer_id)
  references customers(id)
);