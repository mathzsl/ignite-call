import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight, Check } from "phosphor-react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { AuthErrorMessage, ConnectBox, ConnectBoxContent } from "./styles";

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === "authenticated";

  async function handleNavigateToNextStep() {
    await router.push("/register/time-intervals");
  }

  async function handleConnectCalendar() {
    await signIn("google", { callbackUrl: "/register/connect-calendar" });
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectBoxContent>
          <Text>Google Calendar</Text>

          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectBoxContent>

        {hasAuthError && (
          <AuthErrorMessage size="sm">
            Falha ao conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthErrorMessage>
        )}

        <Button
          onClick={handleNavigateToNextStep}
          type="submit"
          disabled={!isSignedIn}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
