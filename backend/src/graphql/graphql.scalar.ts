import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar("Date", (type) => Date)
export class DateScalar implements CustomScalar<string, Date> {
    description = "Date scalar type";

    parseValue(value: number): Date {
        return new Date(value);
    }

    serialize(value: Date): string {
        const date = new Date(value);
        return date.toISOString();
    }

    parseLiteral(ast: ValueNode): Date {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }

        return null;
    }
}
