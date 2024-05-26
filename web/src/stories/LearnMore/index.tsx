import styled from "styled-components";
import ButtonLink from "../ButtonLink";
import {
  MontaraDocsPage,
  navigateToMontaraDocsPage,
} from "../../services/montara-docs.service";

type LearnMoreProps = {
  text?: string;
  path: MontaraDocsPage;
  className?: string;
};

const LearnMoreWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  a {
    text-decoration: none;
    text-transform: initial;
    color: ${({ theme }) => theme.blue};
    font-size: 0.875rem;
    font-weight: initial;
  }
`;

function LearnMore({
  text = "Learn more",
  path,
  className = "",
}: Readonly<LearnMoreProps>) {
  const userId = "";
  const tenantId = "";

  return (
    <LearnMoreWrapper className={`m-learn-more ${className}`}>
      <img src="/assets/v2/learn_more.svg" alt={text} />
      <ButtonLink
        label={text}
        onClick={() =>
          navigateToMontaraDocsPage({
            page: path,
            profileData: {
              userId,
              tenantId,
            },
          })
        }
      />
    </LearnMoreWrapper>
  );
}

export default LearnMore;
