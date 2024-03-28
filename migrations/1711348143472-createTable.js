"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTable1711348143472 = void 0;
class CreateTable1711348143472 {
  constructor() {
    this.name = "CreateTable1711348143472";
  }
  up(queryRunner) {
    return __awaiter(this, void 0, void 0, function* () {
      yield queryRunner.query(
        `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "idUser" uuid NOT NULL, "idTask" uuid NOT NULL, "data" date NOT NULL DEFAULT now(), "commentText" text NOT NULL, "userId" uuid, "taskId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
      );
      yield queryRunner.query(
        `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
      yield queryRunner.query(
        `ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    });
  }
  down(queryRunner) {
    return __awaiter(this, void 0, void 0, function* () {
      yield queryRunner.query(
        `ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"`,
      );
      yield queryRunner.query(
        `ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`,
      );
      yield queryRunner.query(`DROP TABLE "comments"`);
    });
  }
}
exports.CreateTable1711348143472 = CreateTable1711348143472;
