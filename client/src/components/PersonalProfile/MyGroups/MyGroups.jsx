import image from "../../../pngegg.png";
export default function MyGroups() {
  return (
    <div className="m-3 d-flex flex-column container-glass-light container-in-progress">
    <h6>В стадии разработки</h6>
    <br />
    <button disabled="disabled"></button>
    <img alt="загрузка" src={image} />
    </div>
  )
}
