import React from "react";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import { useCreateFamily } from "src/hooks/families/useCreateFamily";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

type FormData = {
  name: string;
};

export const FormContainer: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const { createFamily } = useCreateFamily({
    onCreateFamily: () => {
      router.push("/");
    },
    onCreateFamilyError: () => {
      // todo エラーToastを表示
    },
  });
  const classes = useStyles();

  const onClickCreateFamily = handleSubmit(async (data) => {
    await createFamily({
      input: {
        name: data.name,
        family_users: {
          data: [{}],
        },
      },
    });
  });

  return (
    <div className={classes.form}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: "ファミリー名は必須です。" }}
        render={({ field: { onChange, value } }) => (
          <TextField
            type="text"
            label="ファミリー名"
            value={value}
            onChange={onChange}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            required
            fullWidth
            margin="normal"
          />
        )}
      />
      <Box my={1} />
      <Button
        type={"button"}
        name={"name"}
        fullWidth
        variant={"contained"}
        color={"primary"}
        disabled={isSubmitting}
        onClick={onClickCreateFamily}
      >
        作成
      </Button>
    </div>
  );
};
