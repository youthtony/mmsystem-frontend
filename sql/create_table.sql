# 数据库初始化

-- 创建库
create database if not exists mmSystem;

-- 切换库
use mmSystem;

-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
#     账号（手机号）
    phoneId  varchar(256)                           not null comment '账号(手机号)',
#     用户名
    userName     varchar(256)                           null comment '用户昵称',
#     密码
    password varchar(512)                           not null comment '密码',
#     创建时间
    createTime datetime default CURRENT_TIMESTAMP not null comment '创建时间',
#     更新时间
    updateTime datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete   tinyint  default 0                 not null comment '是否删除',
    index  autoId(id)
) comment '用户' collate = utf8mb4_unicode_ci;

-- 传感器表
-- 包含 生产厂家，型号，出厂日期，使用年限
create table if not exists sensor
(
    id          bigint auto_increment comment 'id' primary key,
#     传感器名称
    sensorName  varchar(256)                           not null comment '传感器名称',
#     传感器型号
    sensorType  varchar(256)                           not null comment '传感器型号',
#     传感器生产厂家
    sensorManufacturer varchar(256)                    not null comment '传感器生产厂家',
#     传感器出厂日期
    sensorDate  date                                   not null comment '传感器出厂日期',
#     传感器使用年限
    sensorLife  int                                    not null comment '传感器使用年限',
#     创建时间
    createTime datetime default CURRENT_TIMESTAMP not null comment '创建时间',
#     更新时间
    updateTime datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete   tinyint  default 0                 not null comment '是否删除',
    index   autoId(id)
)  comment '传感器' collate = utf8mb4_unicode_ci;

-- 煤矿表
create table if not exists coalMine
(
    id          bigint auto_increment comment 'id' primary key,
    #     煤矿名称
    coalMineName varchar(256)                           not null comment '煤矿名称',
    #     煤矿所属单位
    coalMineUnit varchar(256)                           not null comment '煤矿所属单位',
    #     创建使用年限
    coalMineLife int                                    not null comment '煤矿使用年限',
    #     煤矿监管单位
    coalMineSupervisionUnit varchar(256)                not null comment '煤矿监管单位',
    #     煤矿地址
    coalMineAddress varchar(256)                        not null comment '煤矿地址',
    #     创建时间
    createTime datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    #     更新时间
    updateTime datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete   tinyint  default 0                 not null comment '是否删除',
    index    autoId(id)
)   comment '煤矿' collate = utf8mb4_unicode_ci;