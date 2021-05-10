import React from "react";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import { MyAppBar } from "src/components/header/MyAppBar";
import { HeaderDrawer } from "src/components/header/HeaderDrawer";
import { useDrawer } from "src/hooks/header/useDrawer";
import { LoadingSpinner } from "src/components/common/LoadingSpinner";
import { HeaderQuery } from "src/components/header/__generated__/HeaderQuery";

const HEADER_QUERY = gql`
  query HeaderQuery {
    families {
      id
      name
    }
  }
`;

export const Header: React.FC = () => {
  const { data, loading } = useQuery<HeaderQuery>(HEADER_QUERY);
  const drawer = useDrawer();

  return (
    <React.Fragment>
      <MyAppBar onOpenDrawer={drawer.open} />
      <HeaderDrawer
        families={loading ? [] : data?.families || []}
        isOpen={drawer.isOpen}
        onClose={drawer.close}
      />
      {loading && <LoadingSpinner />}
    </React.Fragment>
  );
};
