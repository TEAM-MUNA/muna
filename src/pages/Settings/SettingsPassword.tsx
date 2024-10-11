import React, { useEffect } from "react";
// import useCurrentUser from "../../hooks/useCurrentUser";
// import useProfile from "../../hooks/useProfile";

import styles from "./Settings.module.scss";

// import { errorMessages } from "../../utils/messages";
// import useInput from "../../hooks/useInput";
import placeholder from "../../utils/constants/placeholder";

import Title from "../../components/common/Title/Title";
import ImageUploader from "../../components/common/ImageUploader/ImageUploader";
import Input from "../../components/common/Input/Input";

export default function SettingsPassword() {
  return (
    <div className={styles.container}>
      <Title label='프로필 변경' buttonLeft='back' />
      <form action='POST'>
        <ImageUploader />
        <div className={styles.wrapper_input}>
          {/* <Input
            name='nickname'
            value={nickname}
            onChange={onNicknameChange}
            label='닉네임'
            placeholder={placeholder.newNickname}
          /> */}
        </div>
      </form>
    </div>
  );
}
