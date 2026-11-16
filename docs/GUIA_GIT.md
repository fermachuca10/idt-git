# Clase 17 — Guía de Git

Proyecto: https://github.com/fermachuca10/idt-git

## Conceptos del material

- **Working Directory:** lugar donde se editan los archivos.
- **Staging Area:** cambios seleccionados mediante git add.
- **Repositorio local:** versiones que se guardan mediante git commit.
- **Repositorio remoto:** GitHub, donde colaboramos mediante push, pull y Pull Requests.

## Reproducir el flujo en tu computadora

```bash
git clone https://github.com/fermachuca10/idt-git.git
cd idt-git
git status
git branch -a
git log --oneline --graph --all --decorate
git switch develop
git pull origin develop
git switch -c feature/mi-cambio
# Editar un archivo y registrar una nueva versión
git add .
git commit -m "feat: agregar una mejora"
git push -u origin feature/mi-cambio
```

Después, abrir un Pull Request desde feature/mi-cambio hacia develop.

## Reversión segura

```bash
git log --oneline
git revert SHA_DEL_COMMIT
```

El comando git revert agrega otro commit con el cambio inverso; no reescribe el historial.
Para evitar alterar la versión final, la demostración de reversión se realiza en la rama demo/revert.

## Ramas utilizadas

| Rama | Uso |
| --- | --- |
| main | Aplicación estable |
| develop | Integración de cambios |
| feature/gestion-tareas | Desarrollo aislado del CRUD |
| demo/revert | Demostración de reversión de un commit |

## Evidencias

- Pull Request #1: https://github.com/fermachuca10/idt-git/pull/1
- Pull Request #2: https://github.com/fermachuca10/idt-git/pull/2
- Historial: https://github.com/fermachuca10/idt-git/commits/main/
- Gráfico de ramas: https://github.com/fermachuca10/idt-git/network

## Cómo probar la aplicación

Abrir index.html en un navegador. Agregar tareas, marcarlas como completas, filtrarlas y eliminarlas.
La aplicación no necesita instalar dependencias y usa almacenamiento local del navegador cuando está disponible.

**Nota:** Los cambios publicados se hicieron mediante la integración de GitHub; los comandos anteriores son la secuencia equivalente para reproducirlos mediante Git Bash.
