import { Container } from "@/styles/components/GoBack";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";

export default function GoBack() {
  const router = useRouter();

  return (
      <Container onClick={() => router.back()}>
				<FiChevronLeft />
      </Container>
  )
}
