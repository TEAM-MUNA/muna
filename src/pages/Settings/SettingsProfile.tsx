import React, { useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useUserRedirect from "../../hooks/useUserRedirect";
// import useProfile from "../../hooks/useProfile";

import styles from "./Settings.module.scss";

// import { errorMessages } from "../../utils/messages";
import useInput from "../../hooks/useInput";
import placeholder from "../../utils/constants/placeholder";

import Title from "../../components/common/Title/Title";
import ImageUploader from "../../components/common/ImageUploader/ImageUploader";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

export default function SettingsProfile() {
  useUserRedirect();

  // const [initialNickname, setInitialNickname] = useState();

  const currentUser = useCurrentUser();
  const initialNickname = currentUser?.nickname || "";
  const { value: nickname, onChange: onNicknameChange } =
    useInput(initialNickname);

  // if (loading) {
  //   return <p>로딩중</p>;
  // }
  if (!currentUser) {
    return <p>잘못된 접근</p>;
  }
  return (
    <div className={styles.container}>
      <Title label='프로필 변경' buttonLeft='back' />
      <form action='POST'>
        <ImageUploader image={currentUser.profileImage} />
        <div className={styles.wrapper_inner}>
          <Input
            name='email'
            value={currentUser?.email || ""}
            label='이메일'
            disabled
          />
          <Input
            name='nickname'
            value={nickname}
            onChange={onNicknameChange}
            label='닉네임'
            placeholder={placeholder.newNickname}
          />
        </div>
        <div className={styles.wrapper_inner}>
          <Button label='변경하기' size='lg' color='black' fullWidth />
        </div>
      </form>
    </div>
  );
}
