import axios from '@/plugins/axios_local'

export const login = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/login', dados)

    return res.data
  } catch (error) {
    return null
  }
}
