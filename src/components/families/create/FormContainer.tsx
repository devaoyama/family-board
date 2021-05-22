import React from "react";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

type Props = {
  onClickCreateFamily: (data: FormData) => void;
};

type FormData = {
  nickname: string;
  name: string;
};

export const FormContainer: React.FC<Props> = ({ onClickCreateFamily }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const classes = useStyles();

  return (
    <div className={classes.form}>
      <Controller
        name="nickname"
        control={control}
        defaultValue=""
        rules={{ required: "ニックネームは必須です。" }}
        render={({ field: { onChange, value } }) => (
          <TextField
            type="text"
            label="あなたのニックネーム"
            value={value}
            onChange={onChange}
            error={Boolean(errors.nickname)}
            helperText={errors.nickname?.message}
            required
            fullWidth
            margin="normal"
          />
        )}
      />
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
        onClick={handleSubmit(onClickCreateFamily)}
      >
        作成
      </Button>
    </div>
  );
};
