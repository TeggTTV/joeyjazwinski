import os
import datetime

VAULT_ROOT = "/c/Users/josep/Documents/ProjectBrain/ProjectStructure"
PROJECT_DIR = "/c/Users/josep/.PROJECTS/joeyjazwinski"

def scan_project(directory):
    structure = []
    for root, dirs, files in os.walk(directory):
        # Skip common non-essential directories
        if any(ignored in root for ignored in ['.git', 'node_modules', '.next', 'dist']):
            continue
            
        level = root.replace(directory, '').count(os.sep)
        indent = '  ' * level
        name = os.path.basename(root) if root != directory else "Project Root"
        structure.append(f"{indent}- **{name}**")
        
        sub_indent = '  ' * (level + 1)
        for f in files:
            if not f.startswith('.'): # Skip hidden files
                structure.append(f"{sub_indent}- {f}")
                
    return "\n".join(structure)

def update_vault(content):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    file_path = os.path.join(VAULT_ROOT, "Project Structure.md")
    
    note_content = f"""# Project Structure Documentation
Last updated: {timestamp}

## Directory Tree
```text
{content}
```

## Notes
*This note is automatically updated when files in the project change.*
"""
    
    os.makedirs(VAULT_ROOT, exist_ok=True)
    with open(file_path, "w") as f:
        f.write(note_content)
    print(f"Updated: {file_path}")

if __name__ == "__main__":
    try:
        tree = scan_project(PROJECT_DIR)
        update_vault(tree)
    except Exception as e:
        print(f"Error: {e}")
