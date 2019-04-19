-- Create table
CREATE TABLE FIN (
  id VARCHAR(100) PRIMARY KEY,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  comment VARCHAR(200),
  date TEXT,
  amount DECIMAL(10, 2)
);

CREATE TABLE CATEGORY (
  category VARCHAR(100),
  subcategory VARCHAR(100),
  is_common NUMBER
);

INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周中', '早餐', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周中', '午餐', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周中', '晚餐', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周中', '甜点', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周中', '零食', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周末', '早餐', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周末', '午餐', 1);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周末', '晚餐', 1);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周末', '零食', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('周末', '下午茶', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('骐骐', '衣服', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('骐骐', '鞋子', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('骐骐', '医药', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('骐骐', '生活用品', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('骐骐', '餐饮', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('骐骐', '玩具', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('骐骐', '娱乐', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('骐骐', '教育', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('旅游', '材料', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('旅游', '住宿', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('旅游', '交通', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('旅游', '餐饮', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('旅游', '门票', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('旅游', '纪念品', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('旅游', '生活用品', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('旅游', '娱乐', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('汽车周边', '保养', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('汽车周边', '燃油', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('汽车周边', '车载饰物', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('汽车周边', '停车费', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('汽车周边', '路费', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('汽车周边', '罚款', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('汽车周边', '保险', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('汽车周边', '证件', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('汽车周边', '修车', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '生活用品', 1);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '零食', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '化妆品', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '衣服', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '鞋子', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '出行', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '通讯', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '买菜原料', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '水电煤气', 1);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '医药', 1);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '水果', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '工作杂项', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '娱乐', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '音乐', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '学习', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '日常开销', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '健身', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '配饰', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '内衣', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '书', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('生活', '礼物', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('居家', '家政服务', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('居家', '放款房贷', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('交通', '地铁', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('交通', '打车', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('交通', '火车', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('交通', '船舶', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('居家', '美容美发', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('医教', '挂号门诊', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('医教', '医疗药品', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('节假日', '餐饮', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('节假日', '出行', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('节假日', '纪念品', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('节假日', '住宿', 0);
INSERT INTO CATEGORY(category, subcategory, is_common)
VALUES('节假日', '杂项', 0);
