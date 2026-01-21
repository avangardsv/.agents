# Code Guidelines

Universal code guidelines for frontend and backend development.

---

## Backend (Node.js/NestJS)

### Architecture Patterns

**Domain-Driven Design (Light)**
- Each domain module encapsulates: Entity, Service, Module, Controller
- Clear separation of concerns

**Repository Pattern**
```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
}
```

**Service Layer Pattern**
```
Controller -> Service -> Repository -> Database
```

**DTO Pattern**
```typescript
// Request DTO with validation
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;
}

// Response DTO with transformation
export class UserResponseDto {
  id: string;
  username: string;

  static fromEntity(entity: UserEntity): UserResponseDto {
    return {
      id: entity.userUuid,
      username: entity.username,
    };
  }
}
```

### File Naming
```
entity:      user.entity.ts
service:     user.service.ts
controller:  user.controller.ts
module:      user.module.ts
dto:         create-user.dto.ts
interface:   user.interface.ts
enum:        user-status.enum.ts
spec:        user.service.spec.ts
```

### Module Structure
```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => RelatedModule),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

### Error Handling
```typescript
// Custom domain exception
export class DomainException extends HttpException {
  constructor(
    message: string,
    errorCode: string,
    httpStatus: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ message, errorCode }, httpStatus);
  }
}

// Usage
throw new DomainException('Resource expired', 'RESOURCE_EXPIRED', HttpStatus.FORBIDDEN);

// Standard exceptions
throw new NotFoundException('Resource not found');
throw new ConflictException('Resource already exists', 'DUPLICATE_ENTRY');
throw new ForbiddenException('Access denied');
```

### Logging
```typescript
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  async create(dto: CreateDto): Promise<Entity> {
    this.logger.log(`Creating resource`);
    try {
      // operation
      this.logger.log(`Resource created successfully`);
    } catch (error) {
      this.logger.error(`Failed to create resource`, error.stack);
      throw error;
    }
  }
}
```

### Transaction Handling
```typescript
async createWithRelated(dto: CreateDto): Promise<Entity> {
  return this.dataSource.transaction(async (manager) => {
    const entity = await manager.save(Entity, { ...dto });
    await manager.save(RelatedEntity, { entityId: entity.id });
    return entity;
  });
}
```

### Testing
```typescript
describe('UserService', () => {
  let service: UserService;
  let repo: Repository<UserEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should return entity when found', async () => {
    const mock = { id: '123', name: 'test' };
    jest.spyOn(repo, 'findOne').mockResolvedValue(mock as Entity);
    const result = await service.findById('123');
    expect(result).toEqual(mock);
  });
});
```

---

## Frontend (React/Next.js)

### Project Structure
```
app/                    # Next.js App Router
features/               # Feature-based modules
  ├── auth/
  │   ├── api/         # React Query hooks
  │   ├── ui/          # Components
  │   ├── types.ts
  │   └── __tests__/
shared/
  ├── api/             # HTTP client, query config
  ├── context/         # Global contexts
  ├── hooks/           # Reusable hooks
  ├── ui/              # Shared components
  └── types/
```

### State Management

**Multi-Layer Strategy**
1. **React Query** - Server state (API data)
2. **Context API** - Global UI state
3. **Local state** - Component-level

**React Query Pattern**
```typescript
// Async function + Hook pattern
export const getData = async (id: string): Promise<Data> => {
  const response = await axios.get(`/api/data/${id}`);
  return response.data.result;
};

export const useGetData = (id: string) =>
  useQuery({
    queryKey: ['data', id],
    queryFn: () => getData(id),
  });

// Mutation pattern
export const useUpdateData = () =>
  useMutation({
    mutationFn: (dto: UpdateDto) => updateData(dto),
    onSuccess: () => queryClient.invalidateQueries(['data']),
  });
```

### Component Pattern
```typescript
interface WidgetProps {
  title: string;
  disabled?: boolean;
}

export function Widget({ title, disabled = false }: WidgetProps) {
  return (
    <div className={clsx(styles.root, disabled && styles.disabled)}>
      {title}
    </div>
  );
}
```

### Code Style
- TypeScript strict mode
- Descriptive variable names
- Self-describing code over comments
- SCSS modules for component styles
- Translation keys for user-facing text

### Logging
```typescript
// Debounced logs with prefixes
console.log('[AUTH_FLOW] User authenticated');
console.log('[STREAM_LOAD] Loading stream data');
```

### Testing
```typescript
describe('Widget', () => {
  it('renders title', () => {
    render(<Widget title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Widget title="Test" disabled />);
    expect(screen.getByRole('...', { name: 'Test' })).toHaveAttribute('aria-disabled', 'true');
  });
});
```

---

## Universal Guidelines

### API Response Format
```typescript
interface ApiResponse<T> {
  code: string;
  httpCode: number;
  message?: string;
  result?: T;
  errorCode?: string;
}
```

### Error Handling Strategy
- Centralized error formatting
- User-friendly messages
- Structured error codes
- Toast notifications for UI

### Git Commits
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
- Narrow scope per commit
- Meaningful descriptions

### Documentation
- JSDoc for complex functions
- Inline comments only when logic isn't self-evident
- Keep docs close to code
