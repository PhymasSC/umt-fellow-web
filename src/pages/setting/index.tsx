//@ts-nocheck
import { NextPage } from "next";
import { Setting as SettingComponent } from "@components/index";
import { Container } from "@mantine/core";
import { SETTINGS } from "@constants/setting";

const Setting: NextPage = () => {
  return (
    <>
      <Container>
        <SettingComponent setting={SETTINGS} />
      </Container>
    </>
  );
};

export default Setting;
