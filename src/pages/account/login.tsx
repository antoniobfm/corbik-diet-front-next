import Button from '@/components/FormComponents/Button'
import { useAuth } from '@/hooks/auth'
import {
	ButtonLogin,
	Container,
	CreateAccount,
	Footer,
	GetNotifiedContainer,
	Header,
	LoginContainer,
	MiddleContent
} from '@/styles/pages/account/login'
import { useCallback, useEffect, useRef, useState } from 'react'
import Input from '@/components/FormComponents/Input'
import getValidationErrors from '@/utils/getValidationErrors'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { FiCheck, FiMail } from 'react-icons/fi'
import LoginModal from '@/components/LoginModal'
import Loading from '@/components/Loading'
import api from '@/services/api'
import InputWithIcon from '@/components/FormComponents/InputWithIcon'
import * as Yup from 'yup';
import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';
import { useToast } from '@/hooks/toast'
import Head from 'next/head'

interface LoginFormData {
	email: string
	password: string
}

interface WaitlistFormData {
	email: string;
}

export default function Login() {
	const [showLogin, setShowLogin] = useState(false);
	const [waitlisted, setWaitlisted] = useState(false);
	const [loading, setLoading] = useState(false);

	const { addToast } = useToast();

	const formRef = useRef<FormHandles>(null);

	const handleEnterWaitlist = useCallback(async (data: WaitlistFormData) => {
		setLoading(true);
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				email: Yup.string().email().required('Email is required'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const response = await api.post('/waitlist', {email: data.email});

			setWaitlisted(true)
		} catch (err) {
			// const errors = getValidationErrors(err);

			// formRef.current?.setErrors(errors);

			addToast({
				type: 'error',
				title: `You need to insert a valid email`
			});

			setLoading(false);
		}
		setLoading(false);
	}, []);

	return (
		<>
		<Head>
			<title>Corbik</title>
		</Head>
		<AnimatePresence>
		{showLogin && <LoginModal setState={setShowLogin} />}
		</AnimatePresence>
		<Container>
			<Header>
				<div id="logo">
					<svg id="logo-blue-block" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="-0.00585938" width="44" height="44" rx="5.15625" fill="#4452FE" />
					</svg>

					<svg id="logo-type" width="87" height="32" viewBox="0 0 87 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.69412 25.486C7.02233 25.486 5.59821 25.1338 4.42177 24.4295C3.24532 23.7175 2.34364 22.7268 1.71671 21.4574C1.09753 20.1804 0.787941 18.6982 0.787941 17.0109V16.5814C0.787941 14.9405 1.09753 13.4816 1.71671 12.2045C2.3359 10.9275 3.2221 9.92517 4.37533 9.19763C5.52855 8.46235 6.90623 8.09471 8.50837 8.09471C9.63064 8.09471 10.6716 8.26112 11.6314 8.59393C12.5911 8.92674 13.427 9.39499 14.1391 9.9987V13.8995H11.91L11.6081 11.2874C11.2289 11.0087 10.7839 10.792 10.273 10.6372C9.76221 10.4824 9.1856 10.405 8.5432 10.405C7.52929 10.405 6.66243 10.6604 5.94263 11.1713C5.22283 11.6821 4.66944 12.398 4.28245 13.3191C3.9032 14.2401 3.71358 15.3198 3.71358 16.5582V17.0109C3.71358 18.9381 4.15861 20.4513 5.04869 21.5503C5.93876 22.6494 7.17713 23.1989 8.76378 23.1989C9.27461 23.1989 9.77769 23.1408 10.273 23.0247C10.7761 22.9009 11.2173 22.7422 11.5965 22.5487L11.91 20.1804H14.1158V24.058C13.4734 24.4837 12.6801 24.8281 11.7359 25.0913C10.7916 25.3544 9.77769 25.486 8.69412 25.486Z" fill="white" />
						<path d="M4.42177 24.4295L4.05377 25.0375L4.05672 25.0393L4.42177 24.4295ZM1.71671 21.4574L1.07722 21.7675L1.07952 21.7721L1.71671 21.4574ZM1.71671 12.2045L1.07724 11.8945L1.71671 12.2045ZM4.37533 9.19763L4.75452 9.79869L4.75739 9.79687L4.37533 9.19763ZM11.6314 8.59393L11.3985 9.26538L11.6314 8.59393ZM14.1391 9.9987H14.8497V9.66951L14.5986 9.45662L14.1391 9.9987ZM14.1391 13.8995V14.6102H14.8497V13.8995H14.1391ZM11.91 13.8995L11.204 13.9811L11.2767 14.6102H11.91V13.8995ZM11.6081 11.2874L12.3141 11.2058L12.2786 10.8981L12.0289 10.7146L11.6081 11.2874ZM4.28245 13.3191L3.62724 13.0438L3.62531 13.0485L4.28245 13.3191ZM5.04869 21.5503L4.49641 21.9976L5.04869 21.5503ZM10.273 23.0247L10.4352 23.7167L10.4429 23.7148L10.273 23.0247ZM11.5965 22.5487L11.9195 23.1818L12.2521 23.0121L12.3011 22.642L11.5965 22.5487ZM11.91 20.1804V19.4697H11.2872L11.2055 20.0871L11.91 20.1804ZM14.1158 20.1804H14.8265V19.4697H14.1158V20.1804ZM14.1158 24.058L14.5084 24.6504L14.8265 24.4396V24.058H14.1158ZM8.69412 24.7753C7.12274 24.7753 5.83105 24.4449 4.78681 23.8198L4.05672 25.0393C5.36537 25.8227 6.92193 26.1967 8.69412 26.1967V24.7753ZM4.78975 23.8215C3.7327 23.1817 2.92273 22.2944 2.35391 21.1427L1.07952 21.7721C1.76454 23.1591 2.75794 24.2532 4.05378 25.0375L4.78975 23.8215ZM2.35619 21.1474C1.7919 19.9835 1.49861 18.6109 1.49861 17.0109H0.0772663C0.0772663 18.7855 0.403161 20.3772 1.07724 21.7675L2.35619 21.1474ZM1.49861 17.0109V16.5814H0.0772663V17.0109H1.49861ZM1.49861 16.5814C1.49861 15.0312 1.79066 13.681 2.35619 12.5146L1.07724 11.8945C0.404404 13.2822 0.0772663 14.8499 0.0772663 16.5814H1.49861ZM2.35619 12.5146C2.91996 11.3518 3.71824 10.4524 4.75452 9.79869L3.99614 8.59657C2.72596 9.39789 1.75183 10.5031 1.07724 11.8945L2.35619 12.5146ZM4.75739 9.79687C5.77807 9.1461 7.01799 8.80538 8.50837 8.80538V7.38404C6.79448 7.38404 5.27903 7.7786 3.99326 8.59839L4.75739 9.79687ZM8.50837 8.80538C9.55964 8.80538 10.5211 8.96111 11.3985 9.26538L11.8642 7.92248C10.8222 7.56112 9.70163 7.38404 8.50837 7.38404V8.80538ZM11.3985 9.26538C12.2827 9.57197 13.04 9.99863 13.6795 10.5408L14.5986 9.45662C13.814 8.79135 12.8995 8.2815 11.8642 7.92248L11.3985 9.26538ZM13.4284 9.9987V13.8995H14.8497V9.9987H13.4284ZM14.1391 13.1889H11.91V14.6102H14.1391V13.1889ZM12.616 13.818L12.3141 11.2058L10.9022 11.3689L11.204 13.9811L12.616 13.818ZM12.0289 10.7146C11.5766 10.3824 11.0569 10.1322 10.4791 9.9571L10.0669 11.3174C10.5109 11.4519 10.8812 11.6351 11.1874 11.8601L12.0289 10.7146ZM10.4791 9.9571C9.88952 9.77842 9.24171 9.69436 8.5432 9.69436V11.1157C9.12949 11.1157 9.63491 11.1864 10.0669 11.3174L10.4791 9.9571ZM8.5432 9.69436C7.40461 9.69436 6.38859 9.98333 5.53133 10.5917L6.35393 11.7508C6.93627 11.3376 7.65397 11.1157 8.5432 11.1157V9.69436ZM5.53133 10.5917C4.68972 11.189 4.05864 12.0171 3.62726 13.0438L4.93764 13.5943C5.28024 12.779 5.75595 12.1752 6.35393 11.7508L5.53133 10.5917ZM3.62531 13.0485C3.20325 14.0735 3.0029 15.2488 3.0029 16.5582H4.42425C4.42425 15.3908 4.60315 14.4067 4.93959 13.5896L3.62531 13.0485ZM3.0029 16.5582V17.0109H4.42425V16.5582H3.0029ZM3.0029 17.0109C3.0029 19.0422 3.47215 20.7328 4.49641 21.9976L5.60097 21.103C4.84508 20.1697 4.42425 18.8341 4.42425 17.0109H3.0029ZM4.49641 21.9976C5.539 23.2849 6.9923 23.9096 8.76378 23.9096V22.4882C7.36195 22.4882 6.33853 22.0138 5.60097 21.103L4.49641 21.9976ZM8.76378 23.9096C9.32898 23.9096 9.88649 23.8453 10.4352 23.7167L10.1109 22.3328C9.6689 22.4364 9.22023 22.4882 8.76378 22.4882V23.9096ZM10.4429 23.7148C10.9881 23.5806 11.4824 23.4048 11.9195 23.1818L11.2736 21.9157C10.9521 22.0797 10.5642 22.2212 10.1032 22.3347L10.4429 23.7148ZM12.3011 22.642L12.6145 20.2736L11.2055 20.0871L10.892 22.4555L12.3011 22.642ZM11.91 20.891H14.1158V19.4697H11.91V20.891ZM13.4052 20.1804V24.058H14.8265V20.1804H13.4052ZM13.7233 23.4656C13.1571 23.8408 12.4362 24.1583 11.5451 24.4067L11.9266 25.7758C12.924 25.4979 13.7898 25.1266 14.5084 24.6504L13.7233 23.4656ZM11.5451 24.4067C10.6691 24.6508 9.71992 24.7753 8.69412 24.7753V26.1967C9.83546 26.1967 10.9141 26.058 11.9266 25.7758L11.5451 24.4067Z" fill="white" />
						<path d="M24.6407 25.2438C23.4333 25.2438 22.3962 24.9729 21.5293 24.4311C20.6625 23.8816 19.9969 23.127 19.5325 22.1672C19.0681 21.2075 18.8359 20.1007 18.8359 18.8469V18.6031C18.8359 17.357 19.0681 16.2541 19.5325 15.2943C19.9969 14.3346 20.6625 13.58 21.5293 13.0304C22.3962 12.4809 23.4256 12.2061 24.6175 12.2061C25.8249 12.2061 26.862 12.4809 27.7289 13.0304C28.5958 13.5722 29.2614 14.3268 29.7258 15.2943C30.1901 16.2541 30.4223 17.357 30.4223 18.6031V18.8469C30.4223 20.1085 30.1901 21.2191 29.7258 22.1789C29.2614 23.1386 28.5958 23.8893 27.7289 24.4311C26.8698 24.9729 25.8404 25.2438 24.6407 25.2438ZM24.6407 22.9915C25.6082 22.9915 26.328 22.6084 26.8001 21.8422C27.2723 21.0682 27.5083 20.0698 27.5083 18.8469V18.6031C27.5083 17.4034 27.2684 16.4166 26.7885 15.6426C26.3164 14.8609 25.5927 14.47 24.6175 14.47C23.65 14.47 22.9302 14.8609 22.4581 15.6426C21.9937 16.4166 21.7615 17.4034 21.7615 18.6031V18.8469C21.7615 20.0698 21.9937 21.0682 22.4581 21.8422C22.9302 22.6084 23.6578 22.9915 24.6407 22.9915ZM34.4458 25V23.2121L36.1756 22.8638V14.5861L34.3413 14.2378V12.4383H38.8691L39.02 14.0173L39.0432 14.2727C39.7166 12.895 40.6918 12.2061 41.9689 12.2061C42.4487 12.2061 42.8783 12.2681 43.2575 12.3919L42.9208 15.097L41.2839 15.0041C40.7498 14.9731 40.3087 15.0776 39.9604 15.3175C39.6121 15.5575 39.3257 15.8903 39.1013 16.316V22.8638L40.8427 23.2121V25H34.4458ZM53.7824 25.2438C52.9852 25.2438 52.3002 25.089 51.7275 24.7794C51.1547 24.4698 50.6749 24.0209 50.2879 23.4327L50.0557 25H47.5364V9.03671L45.6904 8.68842V6.88892H50.4504V13.8315C50.8297 13.3129 51.294 12.9143 51.8436 12.6357C52.4008 12.3493 53.0471 12.2061 53.7824 12.2061C54.804 12.2061 55.6748 12.4848 56.3946 13.042C57.1144 13.5916 57.6639 14.3655 58.0431 15.364C58.4224 16.3624 58.612 17.535 58.612 18.8817V19.1255C58.612 20.9676 58.1863 22.4497 57.3349 23.572C56.4913 24.6865 55.3071 25.2438 53.7824 25.2438ZM52.9349 22.9335C53.8946 22.9335 54.5912 22.5968 55.0246 21.9234C55.4658 21.2423 55.6864 20.3097 55.6864 19.1255V18.8817C55.6864 17.5582 55.4658 16.5017 55.0246 15.7123C54.5835 14.9151 53.8907 14.5165 52.9465 14.5165C52.3583 14.5165 51.8552 14.6597 51.4372 14.946C51.027 15.2247 50.6981 15.6039 50.4504 16.0838V21.4474C50.7058 21.9196 51.0425 22.2872 51.4605 22.5504C51.8784 22.8058 52.3699 22.9335 52.9349 22.9335ZM62.2756 25V23.2121L64.017 22.8638V14.5861L62.1711 14.2378V12.4383H66.9426V22.8638L68.6725 23.2121V25H62.2756ZM63.9009 9.59397V6.88892H66.9426V9.59397H63.9009ZM72.1038 25V23.2121L73.8569 22.8638V9.03671L71.9993 8.68842V6.88892H76.7709V18.1387L80.6485 14.4468L80.6834 14.4004L79.3715 14.2262V12.4383H85.4317V14.2378L83.818 14.6093L80.4976 17.7207L84.4913 22.8754L86.1631 23.2121V25H80.1261V23.2702L81.229 23.0728L81.1942 23.0264L78.5588 19.5435L76.7709 21.2269V22.8638L78.4079 23.2121V25H72.1038Z" fill="white" />
						<path d="M21.5293 24.4311L21.3152 24.769L21.3173 24.7703L21.5293 24.4311ZM19.5325 22.1672L19.1724 22.3415L19.5325 22.1672ZM21.5293 13.0304L21.3152 12.6926L21.5293 13.0304ZM27.7289 13.0304L27.5147 13.3683L27.5169 13.3696L27.7289 13.0304ZM29.7258 15.2943L29.3652 15.4674L29.3657 15.4685L29.7258 15.2943ZM27.7289 24.4311L27.5169 24.0919L27.5155 24.0928L27.7289 24.4311ZM26.8001 21.8422L27.1407 22.052L27.1416 22.0505L26.8001 21.8422ZM26.7885 15.6426L26.4461 15.8494L26.4486 15.8534L26.7885 15.6426ZM22.4581 15.6426L22.1157 15.4358L22.1151 15.4368L22.4581 15.6426ZM22.4581 21.8422L22.1151 22.048L22.1176 22.052L22.4581 21.8422ZM24.6407 24.8438C23.4945 24.8438 22.5339 24.5873 21.7413 24.0919L21.3173 24.7703C22.2585 25.3586 23.3721 25.6438 24.6407 25.6438V24.8438ZM21.7435 24.0933C20.9421 23.5852 20.3258 22.8884 19.8925 21.993L19.1724 22.3415C19.6679 23.3655 20.3829 24.178 21.3152 24.769L21.7435 24.0933ZM19.8925 21.993C19.4587 21.0964 19.2359 20.0509 19.2359 18.8469H18.4359C18.4359 20.1505 18.6775 21.3187 19.1724 22.3415L19.8925 21.993ZM19.2359 18.8469V18.6031H18.4359V18.8469H19.2359ZM19.2359 18.6031C19.2359 17.4072 19.4585 16.3655 19.8925 15.4685L19.1724 15.1201C18.6777 16.1426 18.4359 17.3068 18.4359 18.6031H19.2359ZM19.8925 15.4685C20.3258 14.5731 20.9421 13.8763 21.7435 13.3683L21.3152 12.6926C20.3829 13.2836 19.6679 14.096 19.1724 15.1201L19.8925 15.4685ZM21.7435 13.3683C22.5365 12.8656 23.4889 12.6061 24.6175 12.6061V11.8061C23.3622 11.8061 22.2559 12.0963 21.3152 12.6926L21.7435 13.3683ZM24.6175 12.6061C25.7627 12.6061 26.7225 12.8661 27.5147 13.3683L27.9431 12.6926C27.0016 12.0958 25.8872 11.8061 24.6175 11.8061V12.6061ZM27.5169 13.3696C28.3162 13.8692 28.9319 14.5647 29.3652 15.4674L30.0864 15.1212C29.5909 14.089 28.8753 13.2752 27.9409 12.6912L27.5169 13.3696ZM29.3657 15.4685C29.7997 16.3655 30.0223 17.4072 30.0223 18.6031H30.8223C30.8223 17.3068 30.5806 16.1426 30.0858 15.1201L29.3657 15.4685ZM30.0223 18.6031V18.8469H30.8223V18.6031H30.0223ZM30.0223 18.8469C30.0223 20.0591 29.7994 21.1083 29.3657 22.0046L30.0858 22.3531C30.5809 21.3299 30.8223 20.1578 30.8223 18.8469H30.0223ZM29.3657 22.0046C28.9327 22.8996 28.317 23.5919 27.5169 24.0919L27.9409 24.7703C28.8745 24.1868 29.5901 23.3776 30.0858 22.3531L29.3657 22.0046ZM27.5155 24.0928C26.7311 24.5875 25.7788 24.8438 24.6407 24.8438V25.6438C25.902 25.6438 27.0085 25.3583 27.9423 24.7695L27.5155 24.0928ZM24.6407 23.3915C25.7345 23.3915 26.5894 22.9467 27.1407 22.052L26.4596 21.6323C26.0666 22.2701 25.4819 22.5915 24.6407 22.5915V23.3915ZM27.1416 22.0505C27.6631 21.1955 27.9083 20.1184 27.9083 18.8469H27.1083C27.1083 20.0211 26.8814 20.9409 26.4586 21.6339L27.1416 22.0505ZM27.9083 18.8469V18.6031H27.1083V18.8469H27.9083ZM27.9083 18.6031C27.9083 17.352 27.6582 16.2862 27.1285 15.4318L26.4486 15.8534C26.8786 16.5469 27.1083 17.4548 27.1083 18.6031H27.9083ZM27.1309 15.4358C26.5806 14.5246 25.7213 14.07 24.6175 14.07V14.87C25.4642 14.87 26.0522 15.1972 26.4461 15.8494L27.1309 15.4358ZM24.6175 14.07C23.5201 14.07 22.6653 14.5258 22.1157 15.4358L22.8005 15.8494C23.1951 15.196 23.78 14.87 24.6175 14.87V14.07ZM22.1151 15.4368C21.6031 16.2902 21.3615 17.3541 21.3615 18.6031H22.1615C22.1615 17.4527 22.3844 16.543 22.8011 15.8484L22.1151 15.4368ZM21.3615 18.6031V18.8469H22.1615V18.6031H21.3615ZM21.3615 18.8469C21.3615 20.1174 21.6024 21.1935 22.1151 22.048L22.8011 21.6364C22.385 20.9429 22.1615 20.0221 22.1615 18.8469H21.3615ZM22.1176 22.052C22.6702 22.9489 23.5343 23.3915 24.6407 23.3915V22.5915C23.7812 22.5915 23.1903 22.2679 22.7987 21.6323L22.1176 22.052ZM34.4458 25H34.0458V25.4H34.4458V25ZM34.4458 23.2121L34.3668 22.82L34.0458 22.8846V23.2121H34.4458ZM36.1756 22.8638L36.2546 23.256L36.5756 23.1913V22.8638H36.1756ZM36.1756 14.5861H36.5756V14.2549L36.2502 14.1932L36.1756 14.5861ZM34.3413 14.2378H33.9413V14.569L34.2667 14.6308L34.3413 14.2378ZM34.3413 12.4383V12.0383H33.9413V12.4383H34.3413ZM38.8691 12.4383L39.2673 12.4003L39.2327 12.0383H38.8691V12.4383ZM39.02 14.0173L39.4184 13.981L39.4182 13.9792L39.02 14.0173ZM39.0432 14.2727L38.6449 14.3089L38.7744 15.7336L39.4026 14.4483L39.0432 14.2727ZM43.2575 12.3919L43.6545 12.4413L43.6952 12.114L43.3817 12.0117L43.2575 12.3919ZM42.9208 15.097L42.8982 15.4963L43.2716 15.5175L43.3178 15.1464L42.9208 15.097ZM41.2839 15.0041L41.2607 15.4034L41.2612 15.4034L41.2839 15.0041ZM39.1013 16.316L38.7474 16.1294L38.7013 16.217V16.316H39.1013ZM39.1013 22.8638H38.7013V23.1917L39.0228 23.2561L39.1013 22.8638ZM40.8427 23.2121H41.2427V22.8842L40.9212 22.8199L40.8427 23.2121ZM40.8427 25V25.4H41.2427V25H40.8427ZM34.8458 25V23.2121H34.0458V25H34.8458ZM34.5247 23.6042L36.2546 23.256L36.0967 22.4717L34.3668 22.82L34.5247 23.6042ZM36.5756 22.8638V14.5861H35.7756V22.8638H36.5756ZM36.2502 14.1932L34.4159 13.8449L34.2667 14.6308L36.101 14.9791L36.2502 14.1932ZM34.7413 14.2378V12.4383H33.9413V14.2378H34.7413ZM34.3413 12.8383H38.8691V12.0383H34.3413V12.8383ZM38.4709 12.4764L38.6218 14.0553L39.4182 13.9792L39.2673 12.4003L38.4709 12.4764ZM38.6216 14.0535L38.6449 14.3089L39.4416 14.2365L39.4184 13.981L38.6216 14.0535ZM39.4026 14.4483C39.7179 13.8031 40.0911 13.3457 40.5104 13.0495C40.9257 12.7561 41.4069 12.6061 41.9689 12.6061V11.8061C41.2537 11.8061 40.6088 12.0006 40.0489 12.3961C39.493 12.7887 39.0418 13.3646 38.6838 14.097L39.4026 14.4483ZM41.9689 12.6061C42.4148 12.6061 42.8014 12.6637 43.1334 12.7721L43.3817 12.0117C42.9552 11.8724 42.4826 11.8061 41.9689 11.8061V12.6061ZM42.8606 12.3425L42.5239 15.0476L43.3178 15.1464L43.6545 12.4413L42.8606 12.3425ZM42.9435 14.6976L41.3065 14.6047L41.2612 15.4034L42.8982 15.4963L42.9435 14.6976ZM41.307 14.6047C40.7081 14.57 40.1725 14.6857 39.7335 14.9881L40.1873 15.6469C40.4448 15.4696 40.7916 15.3762 41.2607 15.4034L41.307 14.6047ZM39.7335 14.9881C39.325 15.2695 38.9978 15.6545 38.7474 16.1294L39.4551 16.5025C39.6536 16.1261 39.8992 15.8454 40.1873 15.6469L39.7335 14.9881ZM38.7013 16.316V22.8638H39.5013V16.316H38.7013ZM39.0228 23.2561L40.7643 23.6043L40.9212 22.8199L39.1797 22.4716L39.0228 23.2561ZM40.4427 23.2121V25H41.2427V23.2121H40.4427ZM40.8427 24.6H34.4458V25.4H40.8427V24.6ZM51.7275 24.7794L51.5373 25.1313L51.7275 24.7794ZM50.2879 23.4327L50.622 23.2128L50.0458 22.337L49.8922 23.3741L50.2879 23.4327ZM50.0557 25V25.4H50.4008L50.4514 25.0586L50.0557 25ZM47.5364 25H47.1364V25.4H47.5364V25ZM47.5364 9.03671H47.9364V8.70512L47.6105 8.64364L47.5364 9.03671ZM45.6904 8.68842H45.2904V9.02001L45.6163 9.08148L45.6904 8.68842ZM45.6904 6.88892V6.48892H45.2904V6.88892H45.6904ZM50.4504 6.88892H50.8504V6.48892H50.4504V6.88892ZM50.4504 13.8315H50.0504V15.056L50.7733 14.0676L50.4504 13.8315ZM51.8436 12.6357L52.0245 12.9925L52.0264 12.9915L51.8436 12.6357ZM56.3946 13.042L56.1497 13.3583L56.1518 13.36L56.3946 13.042ZM58.0431 15.364L57.6692 15.506L58.0431 15.364ZM57.3349 23.572L57.0163 23.3303L57.016 23.3306L57.3349 23.572ZM55.0246 21.9234L54.6889 21.706L54.6883 21.7069L55.0246 21.9234ZM55.0246 15.7123L54.6746 15.9059L54.6754 15.9074L55.0246 15.7123ZM51.4372 14.946L51.662 15.2769L51.6633 15.276L51.4372 14.946ZM50.4504 16.0838L50.095 15.9003L50.0504 15.9866V16.0838H50.4504ZM50.4504 21.4474H50.0504V21.5487L50.0986 21.6378L50.4504 21.4474ZM51.4604 22.5504L51.2473 22.8889L51.2519 22.8917L51.4604 22.5504ZM53.7824 24.8438C53.0369 24.8438 52.4203 24.6992 51.9177 24.4275L51.5373 25.1313C52.1802 25.4788 52.9335 25.6438 53.7824 25.6438V24.8438ZM51.9177 24.4275C51.4078 24.1519 50.9757 23.7505 50.622 23.2128L49.9537 23.6525C50.374 24.2914 50.9017 24.7877 51.5373 25.1313L51.9177 24.4275ZM49.8922 23.3741L49.66 24.9414L50.4514 25.0586L50.6836 23.4913L49.8922 23.3741ZM50.0557 24.6H47.5364V25.4H50.0557V24.6ZM47.9364 25V9.03671H47.1364V25H47.9364ZM47.6105 8.64364L45.7646 8.29535L45.6163 9.08148L47.4622 9.42977L47.6105 8.64364ZM46.0904 8.68842V6.88892H45.2904V8.68842H46.0904ZM45.6904 7.28892H50.4504V6.48892H45.6904V7.28892ZM50.0504 6.88892V13.8315H50.8504V6.88892H50.0504ZM50.7733 14.0676C51.117 13.5976 51.5335 13.2414 52.0245 12.9925L51.6627 12.2789C51.0546 12.5873 50.5423 13.0282 50.1275 13.5954L50.7733 14.0676ZM52.0264 12.9915C52.5181 12.7388 53.0997 12.6061 53.7824 12.6061V11.8061C52.9945 11.8061 52.2836 11.9598 51.6607 12.2799L52.0264 12.9915ZM53.7824 12.6061C54.7268 12.6061 55.5085 12.8619 56.1497 13.3583L56.6394 12.7258C55.841 12.1076 54.8813 11.8061 53.7824 11.8061V12.6061ZM56.1518 13.36C56.8024 13.8567 57.3116 14.5646 57.6692 15.506L58.4171 15.2219C58.0161 14.1665 57.4263 13.3265 56.6373 12.7241L56.1518 13.36ZM57.6692 15.506C58.0274 16.449 58.212 17.5714 58.212 18.8817H59.012C59.012 17.4986 58.8174 16.2759 58.4171 15.2219L57.6692 15.506ZM58.212 18.8817V19.1255H59.012V18.8817H58.212ZM58.212 19.1255C58.212 20.9072 57.8007 22.2963 57.0163 23.3303L57.6536 23.8138C58.572 22.6032 59.012 21.028 59.012 19.1255H58.212ZM57.016 23.3306C56.2556 24.3352 55.195 24.8438 53.7824 24.8438V25.6438C55.4193 25.6438 56.727 25.0379 57.6539 23.8134L57.016 23.3306ZM52.9349 23.3335C53.9994 23.3335 54.8385 22.9517 55.361 22.1399L54.6883 21.7069C54.3439 22.2419 53.7898 22.5335 52.9349 22.5335V23.3335ZM55.3603 22.1409C55.8586 21.3717 56.0864 20.3534 56.0864 19.1255H55.2864C55.2864 20.266 55.073 21.113 54.6889 21.706L55.3603 22.1409ZM56.0864 19.1255V18.8817H55.2864V19.1255H56.0864ZM56.0864 18.8817C56.0864 17.5194 55.8602 16.3876 55.3738 15.5171L54.6754 15.9074C55.0714 16.6159 55.2864 17.597 55.2864 18.8817H56.0864ZM55.3746 15.5186C55.1238 15.0653 54.7917 14.7092 54.3737 14.4687C53.9565 14.2286 53.4759 14.1165 52.9465 14.1165V14.9165C53.3614 14.9165 53.6992 15.0036 53.9747 15.1621C54.2494 15.3202 54.4843 15.562 54.6746 15.9059L55.3746 15.5186ZM52.9465 14.1165C52.2909 14.1165 51.7059 14.2771 51.2111 14.6161L51.6633 15.276C52.0045 15.0423 52.4256 14.9165 52.9465 14.9165V14.1165ZM51.2125 14.6151C50.7423 14.9345 50.3704 15.3666 50.095 15.9003L50.8059 16.2672C51.0257 15.8412 51.3118 15.5148 51.662 15.2769L51.2125 14.6151ZM50.0504 16.0838V21.4474H50.8504V16.0838H50.0504ZM50.0986 21.6378C50.3838 22.165 50.7662 22.5859 51.2473 22.8889L51.6736 22.2119C51.3188 21.9885 51.0278 21.6742 50.8022 21.2571L50.0986 21.6378ZM51.2519 22.8917C51.7418 23.1911 52.3078 23.3335 52.9349 23.3335V22.5335C52.432 22.5335 52.015 22.4205 51.669 22.209L51.2519 22.8917ZM62.2756 25H61.8756V25.4H62.2756V25ZM62.2756 23.2121L62.1971 22.8199L61.8756 22.8842V23.2121H62.2756ZM64.017 22.8638L64.0954 23.2561L64.417 23.1917V22.8638H64.017ZM64.017 14.5861H64.417V14.2545L64.0912 14.1931L64.017 14.5861ZM62.1711 14.2378H61.7711V14.5694L62.0969 14.6309L62.1711 14.2378ZM62.1711 12.4383V12.0383H61.7711V12.4383H62.1711ZM66.9426 12.4383H67.3426V12.0383H66.9426V12.4383ZM66.9426 22.8638H66.5426V23.1913L66.8637 23.256L66.9426 22.8638ZM68.6725 23.2121H69.0725V22.8846L68.7514 22.82L68.6725 23.2121ZM68.6725 25V25.4H69.0725V25H68.6725ZM63.9009 9.59397H63.5009V9.99397H63.9009V9.59397ZM63.9009 6.88892V6.48892H63.5009V6.88892H63.9009ZM66.9426 6.88892H67.3426V6.48892H66.9426V6.88892ZM66.9426 9.59397V9.99397H67.3426V9.59397H66.9426ZM62.6756 25V23.2121H61.8756V25H62.6756ZM62.354 23.6043L64.0954 23.2561L63.9386 22.4716L62.1971 22.8199L62.354 23.6043ZM64.417 22.8638V14.5861H63.617V22.8638H64.417ZM64.0912 14.1931L62.2452 13.8448L62.0969 14.6309L63.9428 14.9792L64.0912 14.1931ZM62.5711 14.2378V12.4383H61.7711V14.2378H62.5711ZM62.1711 12.8383H66.9426V12.0383H62.1711V12.8383ZM66.5426 12.4383V22.8638H67.3426V12.4383H66.5426ZM66.8637 23.256L68.5935 23.6042L68.7514 22.82L67.0216 22.4717L66.8637 23.256ZM68.2725 23.2121V25H69.0725V23.2121H68.2725ZM68.6725 24.6H62.2756V25.4H68.6725V24.6ZM64.3009 9.59397V6.88892H63.5009V9.59397H64.3009ZM63.9009 7.28892H66.9426V6.48892H63.9009V7.28892ZM66.5426 6.88892V9.59397H67.3426V6.88892H66.5426ZM66.9426 9.19397H63.9009V9.99397H66.9426V9.19397ZM72.1038 25H71.7038V25.4H72.1038V25ZM72.1038 23.2121L72.0259 22.8198L71.7038 22.8838V23.2121H72.1038ZM73.8569 22.8638L73.9348 23.2562L74.2569 23.1922V22.8638H73.8569ZM73.8569 9.03671H74.2569V8.70474L73.9306 8.64356L73.8569 9.03671ZM71.9993 8.68842H71.5993V9.02039L71.9256 9.08157L71.9993 8.68842ZM71.9993 6.88892V6.48892H71.5993V6.88892H71.9993ZM76.7709 6.88892H77.1709V6.48892H76.7709V6.88892ZM76.7709 18.1387H76.3709V19.0718L77.0467 18.4284L76.7709 18.1387ZM80.6485 14.4468L80.9244 14.7365L80.9485 14.7135L80.9685 14.6868L80.6485 14.4468ZM80.6834 14.4004L81.0034 14.6404L81.4133 14.0938L80.736 14.0039L80.6834 14.4004ZM79.3715 14.2262H78.9715V14.5766L79.3188 14.6228L79.3715 14.2262ZM79.3715 12.4383V12.0383H78.9715V12.4383H79.3715ZM85.4317 12.4383H85.8317V12.0383H85.4317V12.4383ZM85.4317 14.2378L85.5215 14.6276L85.8317 14.5562V14.2378H85.4317ZM83.818 14.6093L83.7282 14.2195L83.6232 14.2437L83.5445 14.3175L83.818 14.6093ZM80.4976 17.7207L80.2241 17.4289L79.9584 17.6779L80.1814 17.9657L80.4976 17.7207ZM84.4913 22.8754L84.1751 23.1204L84.2664 23.2382L84.4124 23.2676L84.4913 22.8754ZM86.1631 23.2121H86.5631V22.8846L86.2421 22.82L86.1631 23.2121ZM86.1631 25V25.4H86.5631V25H86.1631ZM80.1261 25H79.7261V25.4H80.1261V25ZM80.1261 23.2702L80.0556 22.8764L79.7261 22.9354V23.2702H80.1261ZM81.229 23.0728L81.2995 23.4665L81.9386 23.3522L81.549 22.8328L81.229 23.0728ZM81.1942 23.0264L81.5142 22.7864L81.5132 22.785L81.1942 23.0264ZM78.5588 19.5435L78.8778 19.3021L78.609 18.9468L78.2846 19.2522L78.5588 19.5435ZM76.7709 21.2269L76.4967 20.9356L76.3709 21.0541V21.2269H76.7709ZM76.7709 22.8638H76.3709V23.1877L76.6877 23.2551L76.7709 22.8638ZM78.4079 23.2121H78.8079V22.8883L78.4911 22.8209L78.4079 23.2121ZM78.4079 25V25.4H78.8079V25H78.4079ZM72.5038 25V23.2121H71.7038V25H72.5038ZM72.1818 23.6044L73.9348 23.2562L73.7789 22.4715L72.0259 22.8198L72.1818 23.6044ZM74.2569 22.8638V9.03671H73.4569V22.8638H74.2569ZM73.9306 8.64356L72.0731 8.29527L71.9256 9.08157L73.7832 9.42986L73.9306 8.64356ZM72.3993 8.68842V6.88892H71.5993V8.68842H72.3993ZM71.9993 7.28892H76.7709V6.48892H71.9993V7.28892ZM76.3709 6.88892V18.1387H77.1709V6.88892H76.3709ZM77.0467 18.4284L80.9244 14.7365L80.3727 14.1571L76.4951 17.849L77.0467 18.4284ZM80.9685 14.6868L81.0034 14.6404L80.3634 14.1604L80.3285 14.2068L80.9685 14.6868ZM80.736 14.0039L79.4241 13.8297L79.3188 14.6228L80.6307 14.7969L80.736 14.0039ZM79.7715 14.2262V12.4383H78.9715V14.2262H79.7715ZM79.3715 12.8383H85.4317V12.0383H79.3715V12.8383ZM85.0317 12.4383V14.2378H85.8317V12.4383H85.0317ZM85.342 13.848L83.7282 14.2195L83.9077 14.9992L85.5215 14.6276L85.342 13.848ZM83.5445 14.3175L80.2241 17.4289L80.7711 18.0126L84.0915 14.9012L83.5445 14.3175ZM80.1814 17.9657L84.1751 23.1204L84.8075 22.6304L80.8138 17.4758L80.1814 17.9657ZM84.4124 23.2676L86.0842 23.6042L86.2421 22.82L84.5703 22.4833L84.4124 23.2676ZM85.7631 23.2121V25H86.5631V23.2121H85.7631ZM86.1631 24.6H80.1261V25.4H86.1631V24.6ZM80.5261 25V23.2702H79.7261V25H80.5261ZM80.1966 23.6639L81.2995 23.4665L81.1586 22.6791L80.0556 22.8764L80.1966 23.6639ZM81.549 22.8328L81.5142 22.7864L80.8742 23.2664L80.909 23.3128L81.549 22.8328ZM81.5132 22.785L78.8778 19.3021L78.2398 19.7848L80.8752 23.2677L81.5132 22.785ZM78.2846 19.2522L76.4967 20.9356L77.0451 21.5181L78.833 19.8347L78.2846 19.2522ZM76.3709 21.2269V22.8638H77.1709V21.2269H76.3709ZM76.6877 23.2551L78.3246 23.6034L78.4911 22.8209L76.8542 22.4726L76.6877 23.2551ZM78.0079 23.2121V25H78.8079V23.2121H78.0079ZM78.4079 24.6H72.1038V25.4H78.4079V24.6Z" fill="white" />
					</svg>
				</div>
				<button type="button" onClick={() => setShowLogin(true)}>LOGIN</button>
			</Header>
			<MiddleContent>
				<h1>Own your body.</h1>
				<h2>Lose weight without cutting the fast food, understand what is going on with your body and why so you can act uppon hard data.</h2>
			</MiddleContent>
			<GetNotifiedContainer>
				{!waitlisted &&
				<motion.div id="all-set"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					animate={{ opacity: 1 }}>
					<motion.div
						className="is-done"
						initial={{ opacity: 0, bottom: '-50%', rotate: '360deg', borderRadius: 30 }}
						transition={{
							delay: 0.3,
							type: 'spring',
							duration: 0.6,
							stiffness: 150
						}}
						animate={{ opacity: 1, bottom: '0%', rotate: '0deg' }}
						drag
						dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
						dragElastic={0.5}
					>
						<FiCheck />
					</motion.div>
					<h4>You’re all set!</h4>
					<p>We’ll send you an email when your time comes</p>
				</motion.div>
				}
				<h3>Get invited to our beta</h3>
				<Form
					ref={formRef}
					onSubmit={handleEnterWaitlist}
				>
				<div id="get-notification-container">
					<InputWithIcon name="email" />
				</div>
				<button id="get-notified-button" type="submit" disabled={loading}><span>{loading ? <Loading /> : 'ENTER WAITLIST'}</span></button>
					</Form>
			</GetNotifiedContainer>
			<Footer>
				{/* <img src={'/icons/screens.png'} /> */}
			</Footer>
			{/* <LoginContainer>
				<h3>Login</h3>
				<div>
					<Form ref={formRef} onSubmit={handleSignIn}>
						<Input
							name="email"
							autoCapitalize="no"
							labelName="Email"
							type="email"
							onChange={(e) => setEmailInput(e.target.value)}
						/>
						<Input
							name="password"
							labelName="Password"
							type="password"
							onChange={(e) => setPasswordInput(e.target.value)}
						/>
						<ButtonLogin
							type="submit"
							style={{ width: '100%' }}
							isDisabled={isEmpty}
							disabled={isEmpty}
						>
							{loadingAction ? 'Loading...' : 'SIGN IN'}
						</ButtonLogin>
					</Form>
				</div>
				<h5 onClick={() => router.push('/account/forgot-password')}>
					Forgot password
				</h5>
			</LoginContainer>
			<CreateAccount>
				<Button
					type="button"
					style={{ width: '100%' }}
					fullWidth
					onClick={() => {}}
				>
					CREATE ACCOUNT
				</Button>
			</CreateAccount> */}
		</Container>
		</>
	)
}
