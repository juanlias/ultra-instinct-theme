"""Inspect comments, decorators, numbers, operators, and string delimiters."""
from dataclasses import dataclass


@dataclass(frozen=True)
class Task:
    title: str
    done: bool = False


def summarize(tasks: list[Task], limit: int = 12) -> str:
    selected = [task for task in tasks if not task.done]
    return "\n".join(f'Task: "{task.title}"' for task in selected[:limit])


if __name__ == "__main__":
    print(summarize([Task("Read notes"), Task("Review theme", True)]))
