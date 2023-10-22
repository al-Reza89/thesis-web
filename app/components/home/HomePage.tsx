"use client";

import React, { useState } from "react";
import Table from "./Table";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const HomePage = ({ data, id }: any) => {
  // console.log({ data: data });
  const router = useRouter();

  const { table, highlighted_cells, id: collectionId } = data;
  const [isLoading, setIsLoading] = useState(false);

  // console.log({ table: table });
  // console.log({ highlighted_cells: highlighted_cells });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      orginal_sentence: "",
      sentence_after_deletion: "",
      sentence_after_ambiguity: "",
      final_sentence: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (updateData: any) => {
    console.log({ updateData: updateData });

    try {
      const data: any = {
        id: id,
        collectionId: collectionId,
        sentence_annotations: [
          {
            orginal_sentence: updateData.orginal_sentence,
            sentence_after_deletion: updateData.sentence_after_deletion,
            sentence_after_ambiguity: updateData.sentence_after_ambiguity,
            final_sentence: updateData.final_sentence,
          },
          {
            orginal_sentence: updateData.orginal_sentence,
            sentence_after_deletion: updateData.sentence_after_deletion,
            sentence_after_ambiguity: updateData.sentence_after_ambiguity,
            final_sentence: updateData.final_sentence,
          },
          {
            orginal_sentence: updateData.orginal_sentence,
            sentence_after_deletion: updateData.sentence_after_deletion,
            sentence_after_ambiguity: updateData.sentence_after_ambiguity,
            final_sentence: updateData.final_sentence,
          },
        ],
      };
      setIsLoading(true);

      axios
        .put("/api/label-data", data)
        .then(() => {
          toast.success("submitted successfully");
          router.refresh();
          reset();
        })
        .catch((error) => {
          toast.error("somethig went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });

      // console.log({ data: data });
    } catch (err) {
      toast.error("something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="max-w-[1240px] ">
      <div className="text-center flex flex-col gap-2 ">
        <h1 className="text-xl md:text-4xl font-bold text-blue-500 ">
          {data.table_page_title}
        </h1>
        <h1 className="text-lg md:text-2xl">{data.table_section_title}</h1>
        <p>{data.table_section_text}</p>
      </div>
      <Table data={table} highlighted_cells={highlighted_cells} />
      <div className="text-black py-5 mx-2 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center"
        >
          <label className="pt-8">Orginal_sentence</label>
          <input
            {...register("orginal_sentence", { required: true })}
            defaultValue="write what the row means"
            className=" w-full rounded-md   px-2  "
          />
          {errors.orginal_sentence && <p>This field is required</p>}
          <label className="pt-8">sentence_after_deletion</label>
          <input
            {...register("sentence_after_deletion", { required: true })}
            className=" w-full rounded-md   px-2  "
          />
          {errors.sentence_after_deletion && <p>This field is required</p>}
          <label className="pt-8">sentence_after_ambiguity</label>
          <input
            {...register("sentence_after_ambiguity", { required: true })}
            className=" w-full rounded-md   px-2  "
          />
          {errors.sentence_after_ambiguity && <p>This field is required</p>}
          <label className="pt-8">final_sentence</label>
          <input
            {...register("final_sentence", { required: true })}
            className=" w-full rounded-md   px-2  "
          />
          {errors.final_sentence && <p>This field is required</p>}
          {isLoading ? (
            <button className="cursor-pointer  border-none  bg-red-500 w-full text-2xl py-2 my-5 rounded-lg text-white font-bold">
              <ClipLoader color="#ffffff" size={30} />
            </button>
          ) : (
            <input
              className="cursor-pointer border-none  bg-green-500 w-full text-2xl my-5 py-2 rounded-lg text-white font-bold"
              type="submit"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default HomePage;
