interface CustomRepository<ReturnType = unknown> {
    findById(id: number): Promise<ReturnType | null> | never;
}

export default CustomRepository;
