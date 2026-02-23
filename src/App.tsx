import { useState } from "react";

type UserCardProps = User&{clickLike:()=>void, currentLike:number, clickToggle:()=>void; isDescription:boolean}
type User = {
  name:string;
  bio:string;
  description:Description;
}
type Description = {
  email:string;
  hobby:string;
}
type CardDescriptionProps = Description

function UserCard({name, bio, description, clickLike, currentLike, clickToggle, isDescription}:UserCardProps){
  return(
    <div style={{backgroundColor:"green"}}>
      <h3>{name}</h3>
      <p>{bio}</p>
      <div>
        <label>いいね数: {currentLike}<button onClick={()=>clickLike()}>いいねボタン</button></label>
      </div>
      <div>
        <button type="button" onClick={()=>clickToggle()}>詳細</button>
      </div>
      {isDescription && <CardDescription email={description.email} hobby={description.hobby}/>}
    </div>
  );
}
function CardDescription({email, hobby}:CardDescriptionProps){
  return(
    <div>
      <p>{email}</p>
      <p>{hobby}</p>
    </div>
  );
}
export default function UserApp(){
  const [isDescription, setIsDescription] = useState<boolean>(false);
  const [currentLike, setCurrentLike] = useState<number>(0);
  function clickToggle(){
    setIsDescription(!isDescription);
  }
  function clickLike(){
    setCurrentLike(currentLike + 1);
  }
  return(
    <UserCard name="aaa" bio="sample sample" description={{email:"@gmail.com", hobby:"programming"}} clickLike={clickLike} currentLike={currentLike} clickToggle={clickToggle} isDescription={isDescription}/>
  );
}