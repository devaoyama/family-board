import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { Controller, useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  memberIds: number[];
};

const members = [
  {
    id: 1,
    name: "おれ",
  },
  {
    id: 2,
    name: "きみ",
  },
];

export const DoneHouseworkFormContainer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { control } = useForm<FormData>({ defaultValues: { memberIds: [] } });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>家事を完了</DialogTitle>
      <DialogContent>
        <Controller
          name="memberIds"
          control={control}
          rules={{ required: "メンバーは必須です。" }}
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth>
              <InputLabel id="members-checkbox-label">家事をした人</InputLabel>
              <Select
                labelId="members-checkbox-label"
                id="members-checkbox"
                value={value}
                onChange={onChange}
                input={<Input />}
                renderValue={(selected) => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  const selectedMembers = selected.map((id: number) => {
                    const selectedMember = members.find((member) => member.id === id);
                    return selectedMember?.name;
                  });
                  return selectedMembers.join(", ");
                }}
                multiple
              >
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    <Checkbox checked={value.indexOf(member.id) > -1} />
                    <ListItemText primary={member.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
