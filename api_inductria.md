# API ZTrack Industria



## Cómo funciona

1. El equipo envía un `POST /Datos/` con la trama del sensor.
2. El servidor agrega `fecha_recepcion` (hora del servidor) y guarda la lectura en la colección del mes: `D_{IMEI}_{MM}_{AAAA}`. Ejemplo: `D_860262050303481_10_2026`.
3. En la misma operación actualiza la colección fija `dispositivos` con el IMEI, la fecha de alta, `ultimo_dato` y `ultimo_estado` (copia de la lectura).
4. Las consultas de estado, últimas horas y rango leen esas colecciones. Solo entran documentos con `estado = 1`.
5. El mes de la colección sale de `fecha_recepcion`, no del campo `time` del sensor. Los filtros de fecha también usan `fecha_recepcion`.

Las lecturas de un rango se buscan solo en los meses que cubre ese rango, del mes más nuevo al más antiguo, usando el índice `estado` + `fecha_recepcion`.

## Formato de respuesta

Las consultas usan este sobre:

```json
{
  "data": {},
  "code": 200,
  "message": "texto"
}
```

`/Datos/reciente` y `/Datos/rango` agregan campos extra (`criterio`, `total`, `desde`, `hasta`, `limite`).

Un parámetro inválido responde HTTP 400:

```json
{
  "error": "La fecha inicial es posterior a la final",
  "code": 400,
  "message": "Parametros invalidos"
}
```

El IMEI de las rutas de estado, reciente, rango y Live debe tener entre 8 y 20 letras o números.

## Direcciones

### `GET /`

Comprueba que el servicio está arriba.

```json
{
  "message": "Welcome to this fantastic app ztrack by test!"
}
```

### `POST /Datos/`

Guarda una lectura y registra el equipo.

Cuerpo:

| Campo | Tipo | Obligatorio | Significado |
|---|---|---|---|
| `id` | texto | sí | Identificador de la trama |
| `IMEI` | texto | sí | Equipo |
| `time` | texto | sí | Reloj del sensor, por ejemplo `2024/05/21 15:51:34` |
| `humidity` | número | sí | Humedad |
| `temperature` | número | sí | Temperatura |
| `EC` | número | sí | Conductividad eléctrica |
| `PH` | número | sí | pH |
| `N` | número | sí | Nitrógeno |
| `P` | número | sí | Fósforo |
| `K` | número | sí | Potasio |
| `power` | número | sí | Alimentación |
| `estado` | número | no | Por defecto `1`. Las consultas solo devuelven `1` |

Ejemplo:

```json
{
  "id": "10000009",
  "IMEI": "860262050303481",
  "time": "2024/05/21 15:51:34",
  "humidity": 0.0,
  "temperature": 0.0,
  "EC": 0.0,
  "PH": 0.0,
  "N": 0.0,
  "P": 0.0,
  "K": 0.0,
  "power": 3.95
}
```

Respuesta: el texto plano `sin comandos pendientes`. El documento guardado no viaja en esta respuesta. El equipo queda en `GET /Datos/dispositivos`.

### `GET /Datos/dispositivos`

Lista los equipos que ya se conectaron, del último dato más reciente al más antiguo.

```json
{
  "data": [
    {
      "imei": "860262050303481",
      "estado": 1,
      "ultimo_dato": "2026-10-20T15:51:34",
      "fecha_alta": "2026-10-20T15:51:34",
      "ultimo_estado": {
        "id": "10000009",
        "IMEI": "860262050303481",
        "time": "2024/05/21 15:51:34",
        "humidity": 0.0,
        "temperature": 0.0,
        "EC": 0.0,
        "PH": 0.0,
        "N": 0.0,
        "P": 0.0,
        "K": 0.0,
        "power": 3.95,
        "estado": 1,
        "fecha_recepcion": "2026-10-20T15:51:34"
      }
    }
  ],
  "code": 200,
  "message": "Equipos conectados recuperados."
}
```

Si nadie se ha conectado, `data` es `[]` y `message` es `Lista vacía devuelta`.

Un equipo entra en esta lista al hacer `POST /Datos/`. Si se consulta su estado y todavía no está en la lista, pero hay lecturas históricas, también se registra.

### `GET /Datos/estado/{imei}`

Último estado de un equipo.

`GET /Datos/estado/860262050303481`

```json
{
  "data": {
    "imei": "860262050303481",
    "estado": 1,
    "ultimo_dato": "2026-10-20T15:51:34",
    "fecha_alta": "2026-10-20T15:51:34",
    "ultimo_estado": {
      "id": "10000009",
      "IMEI": "860262050303481",
      "time": "2024/05/21 15:51:34",
      "humidity": 0.0,
      "temperature": 22.5,
      "EC": 1.2,
      "PH": 6.4,
      "N": 10.0,
      "P": 4.0,
      "K": 8.0,
      "power": 3.95,
      "estado": 1,
      "fecha_recepcion": "2026-10-20T15:51:34"
    }
  },
  "code": 200,
  "message": "Ultimo estado del equipo."
}
```

Sin lecturas: `data` es `null` y `message` es `Equipo sin lecturas`.

### `GET /Datos/Live/{imei}`

Misma lectura que `ultimo_estado`, devuelta como lista de un elemento.

`GET /Datos/Live/860262050303481`

```json
{
  "data": [
    {
      "id": "10000009",
      "IMEI": "860262050303481",
      "time": "2024/05/21 15:51:34",
      "humidity": 0.0,
      "temperature": 22.5,
      "EC": 1.2,
      "PH": 6.4,
      "N": 10.0,
      "P": 4.0,
      "K": 8.0,
      "power": 3.95,
      "estado": 1,
      "fecha_recepcion": "2026-10-20T15:51:34"
    }
  ],
  "code": 200,
  "message": "Datos  recuperados exitosamente."
}
```

Sin lecturas: `data` es `[]` y `message` es `Lista vacía devuelta`.

### `GET /Datos/reciente/{imei}`

Lecturas con `fecha_recepcion` dentro de las últimas 12 horas, de la más nueva a la más antigua. Tope interno: 5000.

Si en esas 12 horas no hay ninguna lectura con `estado = 1`, devuelve hasta los últimos 100 registros de los últimos 36 meses que existan para ese IMEI.

`GET /Datos/reciente/860262050303481`

Con datos en la ventana:

```json
{
  "data": [
    {
      "id": "10000009",
      "IMEI": "860262050303481",
      "time": "2026/10/20 15:51:34",
      "humidity": 40.0,
      "temperature": 22.5,
      "EC": 1.2,
      "PH": 6.4,
      "N": 10.0,
      "P": 4.0,
      "K": 8.0,
      "power": 3.95,
      "estado": 1,
      "fecha_recepcion": "2026-10-20T15:51:34"
    }
  ],
  "code": 200,
  "message": "Lecturas de las ultimas 12 horas.",
  "criterio": "12h",
  "total": 1
}
```

Sin datos en la ventana, `criterio` es `100` y `message` es `Sin lecturas en las ultimas 12 horas. Se devuelven los ultimos 100 datos.` Una sola lectura dentro de las 12 horas alcanza para usar el criterio `12h`; en ese caso no se rellena hasta 100.

### `GET /Datos/rango/{imei}`

Lecturas entre dos fechas, por `fecha_recepcion`, de la más nueva a la más antigua.

`GET /Datos/rango/860262050303481?desde=2026-10-01&hasta=2026-10-20&limite=500`

| Parámetro | Obligatorio | Regla |
|---|---|---|
| `desde` | sí | Inicio del rango |
| `hasta` | sí | Fin del rango |
| `limite` | no | Entero de 1 a 2000. Por defecto 2000 |

Formatos de fecha:

- `2026-10-20T15:51:34`
- `2026-10-20T15:51:34Z` o con desplazamiento `-05:00`
- `2026-10-20 15:51:34`
- `2026/10/20 15:51:34`
- `2026-10-20` o `2026/10/20`

Si `desde` o `hasta` traen solo la fecha, `desde` empieza a las 00:00:00 y `hasta` cierra a las 23:59:59. El rango máximo es 366 días. `desde` no puede ser posterior a `hasta`.

```json
{
  "data": [],
  "code": 200,
  "message": "Lecturas en el rango de fecha de recepcion.",
  "desde": "2026-10-01 00:00:00",
  "hasta": "2026-10-20 23:59:59",
  "total": 0,
  "limite": 500
}
```

Cada elemento de `data` tiene la misma forma que una lectura de `/Datos/reciente`. `desde` y `hasta` vuelven ya normalizados. Si hay más lecturas que `limite`, la respuesta trae las más recientes y `total` coincide con ese tope.

### `GET /Datos/{imei}`

Todas las lecturas con `estado = 1` del mes en curso de ese IMEI. No pagina ni filtra por fecha.

`GET /Datos/860262050303481`

```json
{
  "data": [],
  "code": 200,
  "message": "Lista vacía devuelta"
}
```

Con datos, `message` es `Datos  recuperados exitosamente.` y `data` es la lista de lecturas del mes actual. Los meses anteriores no entran en esta ruta; para eso está `/Datos/rango/{imei}`.

## Errores de validación

Estas llamadas responden 400:

- IMEI vacío, con símbolos o fuera de 8 a 20 caracteres en `/estado`, `/reciente`, `/rango` y `/Live`.
- Fecha ilegible, rango invertido, rango mayor a 366 días o `limite` fuera de 1 a 2000.

`GET /Datos/validarComando/` está declarada y no tiene la función de validación disponible. No forma parte del flujo de consulta.
