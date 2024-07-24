import { Container, Flex } from '@mantine/core';
import { ThemeToggle } from '@seminar/theme-toggler';

export default function Index() {
  return (
    <>
      <Container fluid p={'xs'}>
        <Flex
          mih={50}
          gap="md"
          justify="flex-end"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <ThemeToggle />
        </Flex>
      </Container>
    </>
  );
}
