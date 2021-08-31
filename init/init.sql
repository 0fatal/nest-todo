-- grant all privileges on *.* to root@'%' identified by '123456' with grant option;
-- flush privileges;
use mytodo;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NOT NULL,
  `todoId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `createAt` timestamp NOT NULL,
  `updateAt` timestamp NOT NULL,
  `ownerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo
-- ----------------------------
INSERT INTO `todo` VALUES ('306fd448-05b7-4f9a-bf48-1fdabe0e1843', '测试', '啥也不知道', '2021-08-31 13:00:28', '2021-08-31 13:00:28', '726c348a-0028-411c-a116-e2918ac1b18b', 0);
INSERT INTO `todo` VALUES ('bc93f7f8-1f01-4e76-b8e6-16967d193f30', '测试', '啥也不知道111111111111', '2021-08-31 13:50:51', '2021-08-31 13:50:51', '726c348a-0028-411c-a116-e2918ac1b18b', 0);
INSERT INTO `todo` VALUES ('c6f12122-6eac-4d15-935f-599daa630d91', '测试', '啥也不知道', '2021-08-31 13:47:56', '2021-08-31 13:47:56', '726c348a-0028-411c-a116-e2918ac1b18b', 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `nickname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'unknown',
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `createAt` timestamp NOT NULL,
  `updateAt` timestamp NOT NULL,
  `isAdmin` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('09926288-a476-4666-ad15-0f60b381355b', 'admin', '$2b$10$l0UXST2ETsyOQYwOLCRu4.S577QyrdzcVfZnXDWoYOIler/0g/kt6', 'admin1', '123@qq.com', '2021-08-28 20:08:40', '2021-08-28 20:08:40', 1);

SET FOREIGN_KEY_CHECKS = 1;
