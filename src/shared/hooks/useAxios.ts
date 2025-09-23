import { useEffect, useRef, useState } from "react";
import { TokenStorage } from "../services";
import type { AxiosRequestConfig, CancelTokenSource, Method } from "axios";
import axios from "axios";

interface Props<B> {
  url: string;
  method?: Method;
  body?: B;
  config?: AxiosRequestConfig;
  trigger?: boolean;
}

type Data<D> = D | null;
type CustomError = string | null;

interface ReturnType<D> {
  isLoading: boolean;
  data: Data<D>;
  error: CustomError;
}


export const useAxios = <B, D>({ url, method = "GET", body, config, trigger = false }: Props<B>): ReturnType<D> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<Data<D>>(null)
  const [error, setError] = useState<CustomError>(null)
  const cancelSource = useRef<CancelTokenSource | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const source = axios.CancelToken.source()
      cancelSource.current = source;

      try {
        const token = TokenStorage.getToken();
        console.log(token)
        const response = await axios.request<D>({
          url,
          method,
          data: body,
          ...config,
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {})
        });

        setData(response.data);
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          console.log("Petición cancelada", (err as Error).message)
        } else if (axios.isAxiosError(err)) {
          setError(err.message || "Error Desconocido")
        } else {
          setError("Error Desconocido")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      if (cancelSource.current) {
        cancelSource.current.cancel("Componente desmontado")
      }
    }
  }, [body, config, method, url, trigger])

  return { isLoading, data, error }
}