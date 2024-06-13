import {
  DbtManifest,
  LineageResponse,
  ModelMatrializationType,
} from "@montara-io/core-data-types";
import { getLineageDataFromManifest } from "./helpers";

describe("RunDetails", () => {
  it("should get lineage data from manifest", () => {
    const manifest: DbtManifest = {
      nodes: {
        "model.some_schema.table_one": {
          alias: "table_one",
          columns: {},
          config: {
            materialized: ModelMatrializationType.table,
          },
          description: "",
          unique_id: "model.some_schema.table_one",
          depends_on: {
            nodes: [],
          },
        },
        "model.some_schema.table_two": {
          alias: "table_two",
          columns: {},
          config: {
            materialized: ModelMatrializationType.view,
          },
          description: "",
          unique_id: "model.some_schema.table_two",
          depends_on: {
            nodes: ["model.some_schema.table_one"],
          },
        },
      },
      sources: {},
    };
    const result: LineageResponse = getLineageDataFromManifest({ manifest });

    expect(result.edges).toEqual([
      {
        from: "table_one",
        to: "table_two",
      },
    ]);
  });
});
