import { MigrationInterface, QueryRunner } from "typeorm";
import providers from "@const/providers";

export class AuthProviderPopulating1631473213897 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO auth_provider (provider) VALUES
            ('${providers.GOOGLE}'),
            ('${providers.YANDEX}')`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("TRUNCATE auth_provider CASCADE");
    }
}
