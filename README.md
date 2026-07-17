# eGesVen

eGesVen es un prototipo de sistema web para la gestión de ventas, productos, inventario y pedidos.

El proyecto fue desarrollado como parte de la asignatura Arquitectura de Software, con el propósito de implementar una solución funcional basada en una arquitectura modular, mantenible y preparada para futuras integraciones.

## Descripción del proyecto

eGesVen permite administrar productos, consultar un catálogo, generar pedidos y simular un proceso de pago.

La aplicación cuenta con persistencia local mediante `localStorage`, lo que permite conservar los productos y el carrito de compras después de recargar el navegador.

La autenticación y el proceso de pago corresponden a simulaciones académicas y no están conectados a servicios externos reales.

## Objetivo general

Desarrollar un prototipo funcional de un sistema de gestión de ventas que permita administrar productos, controlar el inventario y ejecutar un flujo de compra, aplicando principios de arquitectura de software y separación de responsabilidades.

## Objetivos específicos

- Implementar una interfaz web clara y responsiva.
- Permitir la creación, edición y eliminación de productos.
- Mantener información persistente mediante almacenamiento local.
- Mostrar un catálogo con productos disponibles.
- Implementar un carrito de compras con control de cantidades.
- Validar la disponibilidad de stock.
- Simular el proceso de pago de un pedido.
- Presentar indicadores generales mediante un dashboard.
- Mantener una estructura modular que facilite el mantenimiento y la evolución del sistema.

## Funcionalidades

### Inicio de sesión

- Formulario de acceso.
- Validación de campos obligatorios.
- Navegación al panel principal.
- Autenticación simulada para fines académicos.

### Dashboard

- Cantidad total de productos registrados.
- Productos con stock bajo.
- Productos sin stock.
- Valor total del inventario.
- Cantidad de productos en el pedido actual.
- Subtotal del carrito.
- Alertas de inventario.

### Gestión de productos

- Listado de productos.
- Búsqueda por código, nombre o categoría.
- Creación de productos.
- Edición de productos.
- Eliminación de productos.
- Restauración de productos de ejemplo.
- Persistencia mediante `localStorage`.

### Catálogo

- Visualización de productos disponibles.
- Filtro de búsqueda.
- Visualización de precio y stock.
- Advertencia de stock bajo.
- Exclusión de productos sin stock.
- Incorporación de productos al carrito.

### Carrito de compras

- Visualización del pedido actual.
- Incremento y disminución de cantidades.
- Validación para no superar el stock disponible.
- Eliminación de productos.
- Vaciado completo del carrito.
- Cálculo automático de subtotales.
- Persistencia mediante `localStorage`.

### Pago simulado

- Registro de información del cliente.
- Selección de tarjeta de débito o crédito.
- Validación del correo electrónico.
- Validación del número de tarjeta.
- Validación de fecha de vencimiento.
- Validación del código de seguridad.
- Generación de un número de pedido.
- Presentación de un comprobante.
- Limpieza automática del carrito después del pago.

## Tecnologías utilizadas

- Angular 20
- TypeScript
- HTML5
- CSS3
- Angular Material
- Angular Router
- Angular Forms
- Jasmine
- Karma
- Git
- GitHub
- LocalStorage

## Arquitectura de la aplicación

La aplicación utiliza una estructura modular basada en componentes, servicios, modelos y páginas.

```text
src/app/
├── components/
│   └── product-form/
├── layout/
│   └── main-layout/
├── models/
│   ├── product.ts
│   └── cart-item.ts
├── pages/
│   ├── login/
│   ├── dashboard/
│   ├── products/
│   ├── catalog/
│   ├── cart/
│   └── payment/
├── services/
│   ├── product.ts
│   └── cart.ts
└── app.routes.ts
```

## Capa de presentación

Está formada por las páginas y componentes visuales desarrollados con Angular y Angular Material.

Sus principales responsabilidades son:

mostrar información al usuario;
capturar datos mediante formularios;
gestionar eventos de la interfaz;
navegar entre las distintas vistas.

## Capa de lógica de aplicación

Está representada por los servicios de Angular.

`ProductService` administra las operaciones relacionadas con productos e inventario.

`CartService` administra los productos agregados al pedido.

## Capa de datos

En esta versión académica, la persistencia se implementa utilizando localStorage.

Esta solución puede ser sustituida posteriormente por una API REST y una base de datos sin modificar completamente la capa de presentación.

## Decisiones arquitectónicas
Uso de componentes standalone

La aplicación utiliza componentes standalone de Angular, disminuyendo la dependencia de módulos tradicionales y facilitando la organización del proyecto.

## Uso de servicios

La lógica de productos y carrito se separó de los componentes mediante servicios inyectables.

Esto permite:

- reutilizar la lógica;
- reducir el acoplamiento;
- facilitar las pruebas;
- mejorar la mantenibilidad.

## Uso de modelos

Las interfaces Product y CartItem permiten definir estructuras de datos claras y utilizar el tipado estático de TypeScript.

## Persistencia local

Se utilizó localStorage para mantener los datos del prototipo sin requerir un backend.

Esta decisión permite demostrar el flujo completo de la aplicación, aunque no sustituye una base de datos en un sistema productivo.

## Angular Material

Se utilizó Angular Material para mantener consistencia visual, accesibilidad y reutilización de componentes de interfaz.

## Requisitos de instalación

Antes de ejecutar el proyecto, es necesario contar con:

- Node.js
- npm
- Angular CLI
- Git

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Aalioth1/eGesVen.git
```

Ingresar a la carpeta del proyecto:

```bash
cd eGesVen
```

Instalar las dependencias:

```bash
npm install
```

## Ejecución

Ejecutar el servidor de desarrollo:

```bash
ng serve
```

Abrir en el navegador:

```bash
http://localhost:4200
```

Los archivos generados quedarán almacenados en la carpeta:

dist/

## Pruebas unitarias

Para ejecutar las pruebas con Jasmine y Karma:

ng test

## Control de versiones

El proyecto utiliza Git y GitHub para el control de versiones.

El trabajo se realizó mediante ramas de desarrollo y posteriormente se integró a la rama principal mediante Pull Request.

## Integrantes
- Moisés Martínez
- Sofía Perez
- Ferdynando Melo 

## Contexto académico

> [!NOTE]
> Proyecto desarrollado para la asignatura:

ASY4231 – Arquitectura de Software

Duoc UC

> [!IMPORTANT]
> Este proyecto corresponde a un prototipo académico.

No debe utilizarse para almacenar información sensible ni para procesar pagos reales.