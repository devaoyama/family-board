import React, { useCallback, useMemo, useState } from "react";
import Container from "@material-ui/core/Container";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import dayjs from "dayjs";
import Box from "@material-ui/core/Box";
import { Header } from "src/components/header/Header";
import { GettingStarted } from "src/components/home/GettingStarted";
import { HouseworkList } from "src/components/home/HouseworkList";
import { CreateHouseworkFormContainer } from "src/components/home/CreateHouseworkFormContainer";
import { useDialog } from "src/hooks/common/useDialog";
import { useDeleteHousework } from "src/hooks/houseworks/useDeleteHousework";
import { useDoneHousework } from "src/hooks/houseworks/useDoneHousework";
import { useFetchCurrentUser } from "src/hooks/users/useFetchCurrentUser";
import { useFetchFamilies } from "src/hooks/families/useFetchFamilies";
import { useFetchHouseworks } from "src/hooks/houseworks/useFetchHouseworks";
import { useCreateHousework } from "src/hooks/houseworks/useCreateHousework";
import { useShowSuccessSnackbar } from "src/hooks/common/useShowSuccessSnackbar";
import { useShowErrorSnackbar } from "src/hooks/common/useShowErrorSnackbar";
import { useUpdateHousework } from "src/hooks/houseworks/useUpdateHousework";
import { useFetchHouseworksCount } from "src/hooks/houseworksCount/useFetchHouseworksCount";
import { FetchFamiliesQuery_families_members } from "src/hooks/families/__generated__/FetchFamiliesQuery";

export const HomeContainer: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(dayjs().toDate());
  const showSuccessSnackbar = useShowSuccessSnackbar();
  const showErrorSnackbar = useShowErrorSnackbar();
  const createHouseworkDialog = useDialog();
  const fromDate = useMemo(() => dayjs().subtract(3, "month").toDate(), []);
  const toDate = useMemo(() => dayjs().toDate(), []);
  const dates = useMemo(() => {
    const days = dayjs(toDate).diff(fromDate, "days");
    return [...Array(days + 1)].map((_, i) => {
      return { date: dayjs(fromDate).add(i, "days").format("YYYY-MM-DD"), count: 0 };
    });
  }, []);
  const selectedDateToString = useMemo(() => {
    const today = dayjs();
    const selectedDateByDayjs = dayjs(selectedDate);
    const diff = today.diff(selectedDateByDayjs, "days");
    switch (diff) {
      case 0:
        return "??????";
      case -1:
        return "??????";
      case 1:
        return "??????";
      default:
        return selectedDateByDayjs.format("M???D???");
    }
  }, [selectedDate]);

  const { user } = useFetchCurrentUser();
  const { families } = useFetchFamilies();
  const currentFamily = useMemo(() => {
    if (!user || !families) return undefined;
    return families.find((family) => family.id === user.current_family_id);
  }, [user, families]);
  const currentMember = useMemo((): FetchFamiliesQuery_families_members | undefined => {
    const currentMember = currentFamily?.members.filter((member) => {
      return member.user_id === user?.id;
    });
    return currentMember ? currentMember[0] : undefined;
  }, [currentFamily, currentFamily]);
  const { houseworks } = useFetchHouseworks({
    familyId: user?.current_family_id,
    date: selectedDate,
    from: fromDate,
    to: toDate,
  });
  const { houseworksCount } = useFetchHouseworksCount({
    memberId: currentMember?.id,
    from: fromDate,
    to: toDate,
  });
  const { createHousework } = useCreateHousework({
    onCreateHousework: () => {
      showSuccessSnackbar("??????????????????????????????", {});
    },
    onCreateHouseworkError: () => {
      showErrorSnackbar("???????????????????????????????????????", {});
    },
  });
  const { updateHousework } = useUpdateHousework({
    onUpdateHousework: () => {
      showSuccessSnackbar("??????????????????????????????", {});
    },
    onUpdateHouseworkError: () => {
      showErrorSnackbar("???????????????????????????????????????", {});
    },
  });
  const { deleteHousework } = useDeleteHousework({
    onDeleteHousework: () => {
      showSuccessSnackbar("??????????????????????????????", {});
    },
    onDeleteHouseworkError: () => {
      showErrorSnackbar("???????????????????????????????????????", {});
    },
  });
  const { doneHousework } = useDoneHousework({
    onDoneHousework: () => {
      showSuccessSnackbar("????????????????????????????????????????????????", {});
    },
    onDoneHouseworkError: () => {
      showErrorSnackbar("??????????????????????????????????????????????????????", {});
    },
  });

  const onClickCreateHousework = useCallback(
    async (data) => {
      await createHousework(currentFamily?.id, data.title, data.description, parseInt(data.point));
      createHouseworkDialog.close();
    },
    [currentFamily],
  );

  return (
    <>
      <Header
        families={families}
        currentFamily={currentFamily}
        currentUser={user}
        currentMember={currentMember}
      />
      {currentFamily?.id ? (
        <Container component={"main"} maxWidth={"xs"}>
          <HouseworkList
            selectedDateToString={selectedDateToString}
            houseworks={houseworks}
            members={currentFamily.members}
            onClickAddHouseworkListItem={createHouseworkDialog.open}
            updateHousework={updateHousework}
            deleteHousework={deleteHousework}
            doneHousework={doneHousework}
          />
          <Box my={3} />
          <ReactCalendarHeatmap
            startDate={fromDate}
            endDate={toDate}
            values={[...dates, ...houseworksCount]}
            classForValue={(value) => {
              if (!value?.count) return "color-empty";
              return "color-filled";
            }}
            onClick={(value) => setSelectedDate(new Date(value?.date))}
            monthLabels={[
              "1???",
              "2???",
              "3???",
              "4???",
              "5???",
              "6???",
              "7???",
              "8???",
              "9???",
              "10???",
              "11???",
              "12???",
            ]}
          />
        </Container>
      ) : (
        <GettingStarted />
      )}
      <CreateHouseworkFormContainer
        isOpen={createHouseworkDialog.isOpen}
        onClose={createHouseworkDialog.close}
        onClickCreateHousework={onClickCreateHousework}
      />
    </>
  );
};
