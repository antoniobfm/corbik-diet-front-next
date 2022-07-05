import { signOut } from "@/redux/Authentication/authentication.actions";
import { Container } from "@/styles/components/GoBack";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";

export default function GoBack() {
  const router = useRouter();


  return (
      <Container onClick={() => router.push('/diet')}>
				<FiChevronLeft />
      </Container>
  )
}
