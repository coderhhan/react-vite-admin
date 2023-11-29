import { add, addAsync } from "@/store/App/reducer";
import { useAppSelector, useAppDispatch } from '@/store/hooks'
export default function Home() {

  const app = useAppSelector((state) => (state.app))
  const dispatch = useAppDispatch()
  const handleAdd = () => {
    // dispatch(add({ num: 10 }))
    dispatch(addAsync(10))
  }

  return (
    <div>Home
      {app.data}

      <button v-can="edit" onClick={handleAdd}>anniu</button>
    </div>
  )
}
