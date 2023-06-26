import { Experiment } from "@/types/database/Experiment";
import dbConnect from "@/helper/dbConnect";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { experimentId, bucketId } = z
    .object({
      experimentId: z.string(),
      bucketId: z.string(),
    })
    .parse(body);

  await dbConnect();

  try {
    const existingBucket = await Experiment.findOne(
      {
        _id: experimentId,
        "buckets._id": bucketId,
      },
      { "buckets.$": 1 }
    ).then((experiment: any) => experiment.buckets[0]);

    return new Response(
      JSON.stringify({
        message: "Iterations found",
        title: existingBucket.title,
        description: existingBucket.description,
        iterations: existingBucket.iterations,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error getting iteration",
      }),
      {
        status: 500,
      }
    );
  }
}