import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1628539633234 implements MigrationInterface {
    name = 'Initial1628539633234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "asset_price_in_time" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "timestamp" numeric NOT NULL, "price" numeric, CONSTRAINT "PK_821395849225946f14a88c068e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset_price" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "token0_id" character varying, "token1_id" character varying, "pair_name" character varying NOT NULL, "prices_id" character varying, CONSTRAINT "PK_66aefc74194b50b3f97e6a1ad8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pool_asset_volume" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "pool_id" character varying NOT NULL, "timestamp" numeric NOT NULL, "token0_amount" numeric, "token1_amount" numeric, "shared_asset_amount" numeric, "market_cap" numeric, "trade_amount" numeric, CONSTRAINT "PK_417bcf310c9a1f079684b4988c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pool" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "spec_version" integer, "shared_asset_id" character varying NOT NULL, "token0_id" character varying NOT NULL, "token1_id" character varying NOT NULL, CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "decimal" integer, "name" character varying, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "swap_action" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "is_success" integer NOT NULL, "timestamp" numeric NOT NULL, "block" character varying NOT NULL, "type" character varying NOT NULL, "token0_id" character varying, "token1_id" character varying, "account_id" character varying, "xyk_trade_pool_id" character varying, CONSTRAINT "PK_b0a467555966225698cb6ec7d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trade_transfer" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "is_success" integer NOT NULL, "timestamp" numeric NOT NULL, "block" character varying NOT NULL, "swap_action_id" character varying NOT NULL, "account_to_id" character varying NOT NULL, "account_from_id" character varying NOT NULL, "type" character varying NOT NULL, "path" character varying NOT NULL, "token0" character varying NOT NULL, "token1" character varying NOT NULL, "token0_input" character varying NOT NULL, "token1_input" character varying NOT NULL, "result" character varying NOT NULL, CONSTRAINT "PK_b1a0e68bf0289007b1ab421a88f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "spec_version" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "no_bond_record_account" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "first_reward_at" integer NOT NULL, CONSTRAINT "PK_547e29f031b2605875d1705f4a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staking_reward" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "address" character varying NOT NULL, "balance" numeric NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_63b6754f195dbb71232f598485b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staking_slash" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "address" character varying NOT NULL, "balance" numeric NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_3e74c2a899ae0f904f4142a4d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sum_reward" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "account_reward" numeric NOT NULL, "account_slash" numeric NOT NULL, "account_total" numeric NOT NULL, CONSTRAINT "PK_b2d0e49d114fbf29b6bed61e262" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "asset_price" ADD CONSTRAINT "FK_990066bee6a34decedb27c1e5ab" FOREIGN KEY ("token0_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_price" ADD CONSTRAINT "FK_bb41ca83c7934cbcfa17c33cdd8" FOREIGN KEY ("token1_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_price" ADD CONSTRAINT "FK_1d25685e2b9f004e68fa871a473" FOREIGN KEY ("prices_id") REFERENCES "asset_price_in_time"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool_asset_volume" ADD CONSTRAINT "FK_40a3517b268db93c4349cf7746d" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_5d8e720acc59395025cf5f81da3" FOREIGN KEY ("shared_asset_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_338531367ed63e3eb8e1939980f" FOREIGN KEY ("token0_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_479321eabdd500587fddd0ee88b" FOREIGN KEY ("token1_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_action" ADD CONSTRAINT "FK_2b8ea62f093426d0b25570487a1" FOREIGN KEY ("token0_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_action" ADD CONSTRAINT "FK_dce7723cffbe6fd24127e7fd662" FOREIGN KEY ("token1_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_action" ADD CONSTRAINT "FK_699af4743f8850efe8ce19804ff" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_action" ADD CONSTRAINT "FK_cfd5912e4b2139c0709b3e9db66" FOREIGN KEY ("xyk_trade_pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" ADD CONSTRAINT "FK_9906dafc434dde23f580d4bd6ca" FOREIGN KEY ("swap_action_id") REFERENCES "swap_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" ADD CONSTRAINT "FK_c3e9730caeb6ab2840c7bca23c3" FOREIGN KEY ("account_to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" ADD CONSTRAINT "FK_0abcfd246c686cf28b559ce3b2c" FOREIGN KEY ("account_from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trade_transfer" DROP CONSTRAINT "FK_0abcfd246c686cf28b559ce3b2c"`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" DROP CONSTRAINT "FK_c3e9730caeb6ab2840c7bca23c3"`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" DROP CONSTRAINT "FK_9906dafc434dde23f580d4bd6ca"`);
        await queryRunner.query(`ALTER TABLE "swap_action" DROP CONSTRAINT "FK_cfd5912e4b2139c0709b3e9db66"`);
        await queryRunner.query(`ALTER TABLE "swap_action" DROP CONSTRAINT "FK_699af4743f8850efe8ce19804ff"`);
        await queryRunner.query(`ALTER TABLE "swap_action" DROP CONSTRAINT "FK_dce7723cffbe6fd24127e7fd662"`);
        await queryRunner.query(`ALTER TABLE "swap_action" DROP CONSTRAINT "FK_2b8ea62f093426d0b25570487a1"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_479321eabdd500587fddd0ee88b"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_338531367ed63e3eb8e1939980f"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_5d8e720acc59395025cf5f81da3"`);
        await queryRunner.query(`ALTER TABLE "pool_asset_volume" DROP CONSTRAINT "FK_40a3517b268db93c4349cf7746d"`);
        await queryRunner.query(`ALTER TABLE "asset_price" DROP CONSTRAINT "FK_1d25685e2b9f004e68fa871a473"`);
        await queryRunner.query(`ALTER TABLE "asset_price" DROP CONSTRAINT "FK_bb41ca83c7934cbcfa17c33cdd8"`);
        await queryRunner.query(`ALTER TABLE "asset_price" DROP CONSTRAINT "FK_990066bee6a34decedb27c1e5ab"`);
        await queryRunner.query(`DROP TABLE "sum_reward"`);
        await queryRunner.query(`DROP TABLE "staking_slash"`);
        await queryRunner.query(`DROP TABLE "staking_reward"`);
        await queryRunner.query(`DROP TABLE "no_bond_record_account"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "trade_transfer"`);
        await queryRunner.query(`DROP TABLE "swap_action"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "pool"`);
        await queryRunner.query(`DROP TABLE "pool_asset_volume"`);
        await queryRunner.query(`DROP TABLE "asset_price"`);
        await queryRunner.query(`DROP TABLE "asset_price_in_time"`);
    }

}
