import { Entity } from "typeorm";
import { Person } from "./person.entity";
import { ObjectType } from "@nestjs/graphql";


@Entity('Actors')
@ObjectType()
export class Actor extends Person{}