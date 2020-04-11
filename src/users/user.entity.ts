import { BaseEntity, Column, Entity, PrimaryColumn, Unique, CreateDateColumn, UpdateDateColumn, VersionColumn, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@Unique(['email'])
@Unique(['thirdPartyId'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()    
    thirdPartyId: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 120 })
    email: string;

    @Column()
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at'})
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    UpdatedAt!: Date;

    @VersionColumn()
    version!: number;

    static findByThirdPartyId(thirdPartyId: string) : Promise<User> {        
        return this.createQueryBuilder("user")
            .where("user.thirdPartyId = :thirdPartyId", { thirdPartyId })            
            .getOne();
    }
}