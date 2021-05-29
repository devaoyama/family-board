import React, { useCallback, useMemo } from "react";
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
import { FetchFamiliesQuery_families_family_members } from "src/hooks/families/__generated__/FetchFamiliesQuery";

export const HomeContainer: React.FC = () => {
  const showSuccessSnackbar = useShowSuccessSnackbar();
  const showErrorSnackbar = useShowErrorSnackbar();
  const createHouseworkDialog = useDialog();
  const fromDate = dayjs().subtract(3, "month").toDate();
  const toDate = dayjs().toDate();

  const { user } = useFetchCurrentUser();
  const { families } = useFetchFamilies();
  const currentFamily = useMemo(() => {
    if (!user || !families) return undefined;
    return families.find((family) => family.id === user.current_family_id);
  }, [user, families]);
  const currentMember = useMemo((): FetchFamiliesQuery_families_family_members | undefined => {
    const currentMember = currentFamily?.family_members.filter((familyMembers) => {
      return familyMembers.member.user_id === user?.id;
    });
    return currentMember ? currentMember[0] : undefined;
  }, [currentFamily, currentFamily]);
  const { houseworks } = useFetchHouseworks({ familyId: user?.current_family_id });
  const { houseworksCount } = useFetchHouseworksCount({
    memberId: currentMember?.member.id,
    from: fromDate,
    to: toDate,
  });
  const { createHousework } = useCreateHousework({
    onCreateHousework: () => {
      showSuccessSnackbar("家事を作成しました。", {});
    },
    onCreateHouseworkError: () => {
      showErrorSnackbar("家事の作成に失敗しました。", {});
    },
  });
  const { updateHousework } = useUpdateHousework({
    onUpdateHousework: () => {
      showSuccessSnackbar("家事を編集しました。", {});
    },
    onUpdateHouseworkError: () => {
      showErrorSnackbar("家事の編集に失敗しました。", {});
    },
  });
  const { deleteHousework } = useDeleteHousework({
    onDeleteHousework: () => {
      showSuccessSnackbar("家事を削除しました。", {});
    },
    onDeleteHouseworkError: () => {
      showErrorSnackbar("家事の削除に失敗しました。", {});
    },
  });
  const { doneHousework } = useDoneHousework({
    onDoneHousework: () => {
      showSuccessSnackbar("家事のステータスを変更しました。", {});
    },
    onDoneHouseworkError: () => {
      showErrorSnackbar("家事のステータス変更に失敗しました。", {});
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
            houseworks={houseworks}
            members={currentFamily.family_members}
            onClickAddHouseworkListItem={createHouseworkDialog.open}
            updateHousework={updateHousework}
            deleteHousework={deleteHousework}
            doneHousework={doneHousework}
          />
          <Box my={3} />
          <ReactCalendarHeatmap
            startDate={fromDate}
            endDate={toDate}
            values={[...houseworksCount]}
            monthLabels={[
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
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
