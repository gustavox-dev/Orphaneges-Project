import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602806073644 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',

                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',
                }
        ],
        foreignKeys: [ // Chave primária
            {
                name: 'ImageOrphanage',
                columnNames: ['orphanage_id'],
                referencedTableName: 'orphanages', // Tabela que está se relacionando
                referencedColumnNames: ['id'], // Coluna que está sendo selecionada
                onUpdate: 'CASCADE', // Altera o ID de forma automática
                onDelete: 'CASCADE' //  Deleta as imagens
            }
        ]
        }) )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }

}
