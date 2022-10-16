import { queryType } from "nexus";

export const Query = queryType({
    definition(t) {
        t.field("hello", {
            type: "String",
            resolve: () => "Bolo Radhe Shyam Ki Jayy..",
        });
    },
});
