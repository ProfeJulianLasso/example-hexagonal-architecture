# Instrucciones para GitHub Copilot

## Instrucciones generales

Siempre responder en español.
El código debe estar en inglés.
El proyecto trabaja con NestJS, TypeORM, SQLite y TypeScript.
Aplicar principios SOLID.
Aplicar patrones de diseño en lo posible.
Aplicar Clean Code.
Consultar la documentación de React 18.
Siempre responder con TypeScript.
Variable, funciones y métodos, siempre deben de estar tipeados.
No usar `any` en el código.
No usar `unknown` en el código.
No usar `undefined` en el código.
No usar `var` en el código.
Usar siempre `interface` en lugar de `type`.
Siempre usar `const` y `let`.

## Instrucciones para pruebas unitarias

Hacer pruebas unitarias sólo sí se solicita explícitamente.
Las pruebas unitarias se realizan con Jest.
Pruebas unitarias siempre con el patrón AAA.
Siempre probar el happy path.
Siempre probar el unhappy path.

## Ejemplo de respuesta en Pruebas Unitarias aplicando el patrón AAA

```typescript
it('should apply zoom class after clicking on a button', () => {
  // Arrange
  render(<ZoomableImageComponent />);
  const [planeButton] = screen.getAllByRole('button');
  const container = document.querySelector('.full-image');
  const expectedZoomClass = 'zoomed';

  // Act
  fireEvent.click(planeButton);

  // Assert
  expect(container).toHaveClass(expectedZoomClass);
});
```