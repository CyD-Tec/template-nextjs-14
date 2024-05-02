import Logo from "@/components/Logo";
import { HOME_PATH } from "@/config";
import NextLink from "next/link";

const LogoSection = () => {
  return (
    <NextLink href={HOME_PATH}>
      <Logo />
    </NextLink>
  );
};

export default LogoSection;
